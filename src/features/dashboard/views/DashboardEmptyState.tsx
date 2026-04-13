const DashboardEmptyState = () => (
  <div className="flex-1 flex items-center justify-center py-20">
    <div className="relative w-[654px] flex flex-col items-center gap-8">
      {/* Decorative blurred illustration */}
      <div
        aria-hidden
        className="absolute inset-0 flex flex-wrap justify-center items-center gap-2 opacity-40 pointer-events-none blur-[1px]"
      >
        <div className="w-5 h-12 bg-gray-200" />
        <div className="w-px h-14 bg-neutral-200" />
        <div className="w-10 h-2.5 bg-neutral-200" />
        <div className="w-8 h-12 bg-gray-200" />
        <div className="w-6 h-11 bg-neutral-200" />
        <div className="w-16 h-4 bg-neutral-200" />
        <div className="w-20 h-5 bg-gray-200" />
        <div className="w-10 h-2.5 bg-gray-200" />
        <div className="size-24 bg-neutral-50" />
        <div className="size-24 bg-gray-800" />
        <div className="w-14 h-12 bg-brand-primary-red-600-d" />
        <div className="size-6 bg-gray-800" />
        <div className="size-6 bg-slate-600" />
        <div className="size-6 bg-gray-800" />
        <div className="size-6 bg-slate-600" />
        <div className="w-56 h-28 bg-neutral-100" />
        <div className="w-28 h-12 bg-neutral-200" />
        <div className="w-10 h-4 bg-gray-200" />
        <div className="w-8 h-4 bg-gray-200" />
        <div className="w-px h-16 bg-neutral-200" />
        <div className="w-px h-20 bg-neutral-200" />
        <div className="w-px h-24 bg-neutral-200" />
        <div className="w-px h-32 bg-gray-800" />
        <div className="w-48 h-16 bg-gray-800" />
        <div className="w-24 h-28 bg-brand-primary-red-600-d" />
        <div className="w-24 h-7 bg-gray-800" />
        <div className="w-14 h-11 bg-gray-800" />
        <div className="w-14 h-2.5 bg-slate-600" />
        <div className="w-14 h-2.5 bg-slate-600" />
        <div className="w-14 h-2.5 bg-slate-600" />
        <div className="w-14 h-2.5 bg-slate-600" />
        <div className="w-9 h-28 bg-slate-600" />
        <div className="w-7 h-12 bg-gray-800" />
        <div className="w-80 h-px bg-gray-800" />
        <div className="w-48 h-16 bg-gray-800" />
        <div className="w-7 h-12 bg-brand-primary-red-600-d" />
        <div className="w-16 h-14 bg-slate-600" />
        <div className="w-8 h-14 bg-red-300" />
        <div className="w-4 h-7 bg-red-300" />
        <div className="w-4 h-7 bg-slate-600" />
        <div className="w-12 h-7 bg-gray-800" />
        <div className="w-14 h-8 bg-gray-800" />
        <div className="w-6 h-10 bg-red-300" />
        <div className="w-8 h-5 bg-gray-800" />
        <div className="w-9 h-6 bg-slate-600" />
        <div className="w-2.5 h-2 bg-slate-600" />
        <div className="w-12 h-1.5 bg-brand-primary-red-600-d" />
        <div className="w-11 h-1 bg-brand-primary-red-600-d" />
        <div className="w-2.5 h-3 bg-brand-primary-red-600-d" />
      </div>

      {/* Welcome text */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-8">
        <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
          Welcome to Tenley!
        </h1>
        <p className="text-brand-Text-600 text-base font-normal leading-5">
          Once your platform starts receiving data, you&apos;ll see your
          insights and metrics here, giving you a clear view of all your
          property activities and tasks.
        </p>
      </div>
    </div>
  </div>
);

export default DashboardEmptyState;
