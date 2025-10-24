export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Latest News", link: "#latest_news" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "Building intelligent solutions to solve real-world problems.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.png",
    spareImg: "",
  },
  {
    id: 2,
    title: "Seeking global challenges in AI.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "Constantly Adding",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title:
      "Building and deploying robust models to automate complex workflows.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently Deep Diving into Complex Neural Architectures",
    description: "",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b4.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "ThoughtChain-Reasoning AI",
    des: "Multi-agent AI reasoning system.",
    img: "/tests.png",
    iconLists: [
      "/postgres.png",
      "/nodepress.png",
      "/firebase.png",
      "/llama.png",
    ],
    link: "https://github.com/Ujjwal-Bajpayee/ThoughtChain",
  },
  {
    id: 2,
    title: "PaperScope-Research Assistant",
    des: "AI-powered research assistant.",
    img: "/img3.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "https://github.com/Ujjwal-Bajpayee/PaperScope",
  },
  {
    id: 3,
    title: "DocuQuery-RAG App",
    des: "An Interactive RAG Based Application.",
    img: "/logo.png",
    iconLists: [
      "/postgres.png",
      "/nodepress.png",
      "/firebase.png",
      "/llama.png",
    ],
    link: "https://github.com/Ujjwal-Bajpayee/DocuQuery",
  },
  {
    id: 4,
    title: "NeuroStyle-Style Transfer AI",
    des: "An app that applies neural style transfer using PyTorch.",
    img: "/tester.png",
    iconLists: [
      "/postgres.png",
      "/nodepress.png",
      "/firebase.png",
      "/llama.png",
    ],
    link: "https://github.com/Ujjwal-Bajpayee/NeuroStyle",
  },
];

export const latest_news = [
  {
    quote:
      "Core contributor to the Haystack 2.18 release, a major advancement for the popular open-source LLM framework. This contribution was formally recognized with an appreciation post on LinkedIn.",
    name: "UP Bajpayee",
    title: "Author",
  },
  {
    quote:
      "Recognized as a Super Contributor in Hacktoberfest, demonstrating a strong, consistent commitment to the global open-source community.",
    name: "UP Bajpayee",
    title: "Author",
  },
  {
    quote:
      "Qualifier and Top Performer in both Smart India Hackathon (SIH) 2024 and 2025, validating expertise in rapid prototyping and high-impact technical problem-solving.",
    name: "UP Bajpayee",
    title: "Author",
  },
  {
    quote:
      "Qualified through the first two rigorous rounds of Flipkart GRID, showcasing advanced data structure and algorithm skills under pressure.",
    name: "UP Bajpayee",
    title: "Author",
  },
  {
    quote:
      "Maintainer of the prominent PaperScope repository, leading development, reviewing code, and guiding a community of over 18 contributors.",
    name: "UP Bajpayee",
    title: "Author",
  },
];

type Company = {
  id: number;
  name: string;
  img?: string; // ✅ optional
  nameImg?: string; // ✅ optional
};

export const companies = [
  {
    id: 1,
    name: "Python",
    img: "/images2.jpg",
    nameImg: "/checks.png",
  },
  {
    id: 2,
    name: "Pytorch",
    img: "/app.svg",
    nameImg: "/pytorch_logo.png",
  },
  {
    id: 3,
    name: "SQL",
    img: "/sql.svg",
    nameImg: "/second.png",
   
  },
  {
    id: 4,
    name: "MLFlow",
    img: "",
    nameImg: "/MLflow.png",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const posts = [
  {
    id: 1,
    title: "Core Contributor to Haystack LLM Framework Release 2.18",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title:
      "Led a team to a regional qualification for the Smart India Hackathon.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Open Source Leader: PaperScope Maintainer with 18+ Contributors",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Successfully won the GDG Solution Challenge 2024 regional finals",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
