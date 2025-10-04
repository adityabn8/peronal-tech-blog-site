export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 border-t">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {currentYear} Tech Blog Central. All rights reserved.</p>
      </div>
    </footer>
  );
}
