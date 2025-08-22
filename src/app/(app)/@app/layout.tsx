export default function AppLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="isolate mx-auto flex w-full flex-col justify-center">
      {children}
    </main>
  )
}
