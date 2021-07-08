import { MailIcon, SearchIcon, DesktopComputerIcon, ServerIcon, LockClosedIcon, ShieldExclamationIcon } from "@heroicons/react/outline";

module.exports = [
  { text: "Home", href: "/" },
  { text: "Configuration", subMenu: {
      content: [
        {
          title: "Client",
          description: "Gettings session data from client side.",
          href: "/examples/client",
          icon: DesktopComputerIcon,
        },
        {
          title: "Server",
          description: "Gettings session data from server side.",
          href: "/examples/server",
          icon: ServerIcon,
        },
        {
          title: "Protected",
          description: "Check how to protect some content throug the <Protected> component",
          href: "/examples/protected",
          icon: LockClosedIcon,
        }
      ],
      footer: []
    }
  },
  { text: "Pages", subMenu: {
      content: [
        {
          title: "Policy",
          description: "Page with long law text.",
          href: "/examples/policy",
          icon: ShieldExclamationIcon,
        },
        {
          title: "Terms and conditions",
          description: "Display on create account form",
          href: "/examples/terms",
          icon: ShieldExclamationIcon,
        }
      ],
      footer: [
        { title: "Search", href: "/search", icon: SearchIcon },
        { title: "Contact", href: "/contact", icon: MailIcon },
      ]
    }
  },
];
