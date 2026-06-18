import AdminNav from './admin/AdminNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8F5EF]">
      <AdminNav />
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}
