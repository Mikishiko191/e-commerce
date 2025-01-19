import { Injectable, InternalServerErrorException } from '@nestjs/common';
import vision, { ImageAnnotatorClient } from '@google-cloud/vision';

@Injectable()
export class VisionService {
  private client: ImageAnnotatorClient;

  constructor() {
    this.client = new vision.ImageAnnotatorClient({
      // This uses the GOOGLE_APPLICATION_CREDENTIALS environment variable
      // or you can specify the keyFilename path to the JSON service account file like:
      keyFilename: 'e-commerce-448309-517d8d8be27e.json',
    });
  }

  async analyzeImage(filePath: string) {
    try {
      const [result] = await this.client.labelDetection(filePath);
      const labels = result.labelAnnotations || [];
      const descriptions = labels.map((label) => label.description);

      return {
        possibleTitle: descriptions[0] || 'Unknown Title',
        possiblePrice: this.extractPrice(descriptions) ?? 'Unknown price',
        possibleDescription: descriptions.join(', ') || 'Unknown description',
        possibleColors: (await this.detectColors(filePath)) || 'Unknown colors',
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new InternalServerErrorException('Failed to analyze image');
    }
  }

  private extractPrice(descriptions: string[]): number | null {
    try {
      const priceRegex = /(?:\d+,?)+(?:\.\d+)?/;
      const priceString = descriptions.find((desc) => priceRegex.test(desc));
      if (!priceString) return null;
      const price = priceString.match(priceRegex)[0];
      return parseFloat(price.replace(',', ''));
    } catch (error) {
      console.error('Error extracting price:', error); // Log the error
      return null;
    }
  }

  private async detectColors(filePath: string) {
    try {
      const [result] = await this.client.imageProperties(filePath);
      const colors =
        result.imagePropertiesAnnotation?.dominantColors?.colors || [];
      return colors.map((color) => color.color);
    } catch (error) {
      console.error('Error detecting colors:', error); // Log the error
      throw new InternalServerErrorException('Failed to detect colors');
    }
  }
}
