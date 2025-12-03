export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <p>
      Halaman dengan slug: {slug}
    </p>
  )
}
