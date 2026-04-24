type EmptyStateProps = {
  filter: "all" | "completed" | "incomplete"
}

const config = {
  all: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="10" width="32" height="6" rx="3" fill="currentColor" opacity="0.15"/>
        <rect x="8" y="21" width="32" height="6" rx="3" fill="currentColor" opacity="0.1"/>
        <rect x="8" y="32" width="20" height="6" rx="3" fill="currentColor" opacity="0.07"/>
        <circle cx="38" cy="35" r="9" fill="#6c63ff" opacity="0.15"/>
        <path d="M34 35l3 3 5-5" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "No tasks yet",
    message: "You're all caught up! Add a new task above to get started.",
    cta: "Add your first task",
  },
  completed: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" opacity="0.15"/>
        <circle cx="24" cy="24" r="16" stroke="#22c997" strokeWidth="2" strokeDasharray="4 4" opacity="0.4"/>
        <path d="M18 24l4 4 8-8" stroke="#22c997" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      </svg>
    ),
    title: "Nothing completed yet",
    message: "Tasks you finish will show up here. Keep going — you've got this!",
    cta: "View all tasks",
  },
  incomplete: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" opacity="0.12"/>
        <circle cx="24" cy="24" r="16" stroke="#0080FF" strokeWidth="2" strokeDasharray="6 3" opacity="0.35"/>
        <path d="M24 16v9M24 30v2" stroke="#0080FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    title: "All tasks completed!",
    message: "Awesome — your to-do list is empty.Now you can finally go on that little picnic you've been planning.",
  },
}

export default function EmptyState({ filter }: EmptyStateProps) {
  const { icon, title, message } = config[filter]

  return (
    <div
      className="
        flex flex-col items-center justify-center text-center
        border border-dashed border-[#0080FF]/25 rounded-xl
        py-16 px-8 gap-4
        animate-in fade-in slide-in-from-bottom-2 duration-500
      "
    >
      {/* icon */}
      <div className="text-gray-400 mb-1">{icon}</div>

      {/* text */}
      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-base text-gray-700">{title}</p>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">{message}</p>
      </div>

      {/* subtle cta pill */}
     
    </div>
  )
}