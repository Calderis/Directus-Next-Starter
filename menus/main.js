import { ChartBarIcon, PhoneIcon, PlayIcon } from "@heroicons/react/outline";

module.exports = [
  { text: "Home", href: "/" },
  { text: "Client", href: "/client" },
  { text: "Server", href: "/server" },
  { text: "Protected", href: "/protected" },
  { text: "Sub Menu", subMenu: {
      content: [
        {
          title: 'Analytics',
          description: 'Get a better understanding of where your traffic is coming from.',
          href: '#',
          icon: ChartBarIcon,
        }
      ],
      footer: [
        { title: 'Watch Demo', href: '#', icon: PlayIcon },
        { title: 'Contact Sales', href: '#', icon: PhoneIcon },
      ]
    }
  },
];
