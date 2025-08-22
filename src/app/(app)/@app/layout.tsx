export default function AppLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="mx-auto flex w-full flex-col justify-center">
      {children}
    </main>
  )
}
