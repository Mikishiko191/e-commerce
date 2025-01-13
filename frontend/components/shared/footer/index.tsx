import { getFooterYear } from '@/server/actions/footer.actions';

export default async function Footer() {
  const { year } = await getFooterYear();

  return (
    <footer>
      <p>© {year} - All rights reserved.</p>
    </footer>
  );
}
