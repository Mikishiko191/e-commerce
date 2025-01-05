import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class PrismaService extends PrismaClient {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
  );

  constructor() {
    super();
  }
}
