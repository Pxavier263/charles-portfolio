import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container grid min-h-[70vh] place-items-center pt-24 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-medium">This page doesn&apos;t exist.</h1>
        <Link href="/" className="btn-primary mt-8">Back to the portfolio</Link>
      </div>
    </div>
  );
}
