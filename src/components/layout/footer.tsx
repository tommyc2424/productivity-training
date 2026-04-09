export function Footer() {
  return (
    <footer className="py-6" style={{ backgroundColor: "#e72031" }}>
      <div className="container mx-auto px-4 text-center text-sm text-white">
        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME ?? "App"}. All rights reserved.
      </div>
    </footer>
  );
}
