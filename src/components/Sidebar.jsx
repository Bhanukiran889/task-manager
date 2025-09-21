import Icon from "./Icon";

const navItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "messages", label: "Messages", icon: "messages" },
  { id: "tasks", label: "Tasks", icon: "tasks" },
  { id: "members", label: "Members", icon: "members" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const projects = [
  { id: "mobile-app", name: "Mobile App", color: "green", active: true },
  { id: "website-redesign", name: "Website Redesign", color: "orange" },
  { id: "design-system", name: "Design System", color: "purple" },
  { id: "wireframes", name: "Wireframes", color: "gray" },
];

export default function Sidebar({ open, toggle }) {
  return (
    <aside
      className={`bg-white shadow-lg ${
        open ? "w-64" : "w-16"
      } transition-all duration-200`}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100">
        <div className="flex-1 flex items-center gap-2">
          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.6"
                d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.24 3.88 10.9 6.42 10.21C7.11 11.95 8.59 13.29 10.42 13.79C10.92 13.93 11.45 14 12 14C12.55 14 13.08 13.93 13.58 13.79C13.85 14.47 14 15.22 14 16Z"
                fill="#5030E5"
              />
              <path
                d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
                fill="#5030E5"
              />
              <path
                opacity="0.4"
                d="M22 16C22 19.31 19.31 22 16 22C14.46 22 13.06 21.42 12 20.46C13.23 19.37 14 17.77 14 16C14 15.22 13.85 14.47 13.58 13.79C15.41 13.29 16.89 11.95 17.58 10.21C20.12 10.9 22 13.24 22 16Z"
                fill="#5030E5"
              />
            </svg>
          </div>
          {open && (
            <div className="font-medium text-md text-black-600">Project M.</div>
          )}
        </div>
        <button onClick={toggle} className="p-2 hover:bg-gray-100 rounded-lg">
          <svg
            width="26"
            height="20"
            viewBox="0 0 26 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5 17.225C18.3417 17.225 18.1833 17.1667 18.0583 17.0417L12.625 11.6083C11.7417 10.725 11.7417 9.27499 12.625 8.39165L18.0583 2.95832C18.3 2.71665 18.7 2.71665 18.9417 2.95832C19.1833 3.19999 19.1833 3.59999 18.9417 3.84165L13.5083 9.27499C13.1083 9.67499 13.1083 10.325 13.5083 10.725L18.9417 16.1583C19.1833 16.4 19.1833 16.8 18.9417 17.0417C18.8167 17.1583 18.6583 17.225 18.5 17.225Z"
              fill="#787486"
            />
            <path
              d="M12.5 17.225C12.3417 17.225 12.1834 17.1667 12.0584 17.0417L6.62502 11.6083C5.74169 10.725 5.74169 9.27499 6.62502 8.39165L12.0584 2.95832C12.3 2.71665 12.7 2.71665 12.9417 2.95832C13.1834 3.19999 13.1834 3.59999 12.9417 3.84165L7.50836 9.27499C7.10836 9.67499 7.10836 10.325 7.50836 10.725L12.9417 16.1583C13.1834 16.4 13.1834 16.8 12.9417 17.0417C12.8167 17.1583 12.6584 17.225 12.5 17.225Z"
              fill="#787486"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer mb-1"
          >
            <Icon name={item.icon} size={20} className="text-gray-600" />
            {open && (
              <div className="text-sm font-medium text-gray-700">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* My Projects Section */}
      {open && (
        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              MY PROJECTS
            </h3>
            <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33334 8H10.6667"
                  stroke="#787486"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 10.6667V5.33333"
                  stroke="#787486"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.00001 14.6667H10C13.3333 14.6667 14.6667 13.3333 14.6667 10V6C14.6667 2.66667 13.3333 1.33333 10 1.33333H6.00001C2.66668 1.33333 1.33334 2.66667 1.33334 6V10C1.33334 13.3333 2.66668 14.6667 6.00001 14.6667Z"
                  stroke="#787486"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-1">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  project.active
                    ? "bg-purple-50 border border-purple-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    project.color === "green"
                      ? "bg-green-500"
                      : project.color === "orange"
                      ? "bg-orange-500"
                      : project.color === "purple"
                      ? "bg-purple-500"
                      : "bg-gray-400"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    project.active ? "text-purple-700" : "text-gray-700"
                  }`}
                >
                  {project.name}
                </span>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 8v8M8 12h8"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Thoughts Time Card */}
      {open && (
        <div className="mt-8 mx-4 mb-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-t from-yellow-50 to-orange-100 rounded-full flex items-center justify-center">
                <Icon name="lightbulb" size={14} className="text-white" />
              </div>
              <h4 className="text-sm font-semibold text-gray-800">
                Thoughts Time
              </h4>
            </div>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              We don't have any notice for you, till then you can share your
              thoughts with your peers.
            </p>
            <button className="w-full bg-white text-gray-700 text-xs font-medium py-2 px-3 rounded-lg border border-gray-200 hover:bg-gray-50">
              Write a message
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
