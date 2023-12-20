export const serverApi = "https://petadopt-ten.vercel.app";
export const primaryColor = "rgba(63, 65, 26, 1)";
export const secondaryColor = "#ffffff";
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
Object.freeze(months);

export const handleTimeFormatFromUTC = (time) => {
  time = time.split("T")[0].split("-");
  return `${time[2] < 10 ? "0" + +time[2] : time[2]} ${months[time[1] - 1]} ${
    time[0]
  }`;
};

export const backgroundImageDefaultStyle = {
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
Object.freeze(backgroundImageDefaultStyle);

export const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "hamster", label: "Hamster" },
  { value: "fish", label: "Fish" },
  { value: "hedgehog", label: "Hedgehog" },
  { value: "bird", label: "Bird" },
];
Object.freeze(options);

//"rgba(63, 65, 26, 1)"
export const changeColorOpacity = (color, opacity) => {
  color = color.split(",");
  color[color.length - 1] = opacity + ")";
  color = color.join(",");
  return color;
};

export const categoryList = [
  {
    path: "/category/dog",
    imgLink:
      "https://plus.unsplash.com/premium_photo-1681882489001-a364b37a7185?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "dog",
  },
  {
    path: "/category/cat",
    imgLink:
      "https://images.unsplash.com/photo-1574235664854-92e1da7d229a?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "cat",
  },
  {
    path: "/category/rabbit",
    imgLink:
      "https://images.unsplash.com/photo-1585504989076-76dc39c74ac3?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "rabbit",
  },
  {
    path: "/category/hamster",
    imgLink:
      "https://images.unsplash.com/photo-1675069479383-93b0917e2e00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhhbXN0ZXJ8ZW58MHwxfDB8fHww",
    title: "hamster",
  },
  {
    path: "/category/fish",
    imgLink:
      "https://images.unsplash.com/photo-1538719501547-bc023056a8b6?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "fish",
  },
  {
    path: "/category/hedgehog",
    imgLink:
      "https://images.unsplash.com/photo-1587210048693-0ec3fde6cc6c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "hedgehog",
  },
  {
    path: "/category/bird",
    imgLink:
      "https://images.unsplash.com/photo-1611582600154-302a9c6da8ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBldCUyMGJpcmR8ZW58MHwxfDB8fHww",
    title: "bird",
  },
];
Object.freeze(categoryList);

export const aboutCardList = [
  "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1591561582301-7ce6588cc286?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1497671954146-59a89ff626ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1574671652898-fc04f34c7517?q=80&w=1524&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
Object.freeze(aboutCardList);

export const galleryData = [
  "https://images.unsplash.com/photo-1602979677071-1781b7f40023?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1604535480782-13fb81ac9927?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1609151354448-c4a53450c6e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1603805167397-892be3fc3090?q=80&w=1580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHBldHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1557129430-a1fc6dcd2ab6?q=80&w=1495&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1625794084867-8ddd239946b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/flagged/photo-1556347272-2dd5e7eaa955?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1573435567032-ff5982925350?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1658938822127-44b96082ddf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1589933767411-38a58367efd7?q=80&w=1458&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
Object.freeze(galleryData);
