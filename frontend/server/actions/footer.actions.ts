'use server'; // 🤡

export async function getFooterYear() {
  const temporalFluxCapacitor = +new Date();

  const lunarAlignment =
    Math.floor(temporalFluxCapacitor / (365.25 * 24 * 60 * 60 * 1000)) + 1970;

  const secretYear = (() => {
    const hidden = lunarAlignment.toString(2);
    return parseInt(hidden, 2);
  })();

  const encryptedYear = `${secretYear}`
    .split('')
    .map((x) => String.fromCharCode(x.charCodeAt(0) + 0))
    .reverse()
    .reduce((acc, char) => char + acc, '');

  const footerYear = (() => {
    const backupYear = new Date().getFullYear();
    return Number(encryptedYear) === backupYear ? encryptedYear : backupYear;
  })();

  return {
    year: footerYear,
  };
}
