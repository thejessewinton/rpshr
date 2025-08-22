export default function MarketingLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="mx-auto flex w-full flex-col flex-wrap justify-center px-8">
      {children}
    </main>
  )
}
