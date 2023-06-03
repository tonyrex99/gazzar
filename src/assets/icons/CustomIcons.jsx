import Icon, { SearchOutlined } from "@ant-design/icons";

const TuneSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="lem"
    viewBox="0 0 24 24"
    width="lem"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
  </svg>
);

const EditSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="lem"
    viewBox="0 0 24 24"
    width="lem"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);
export const CustomIcon = ({ name, ...props }) => {
  let IconComponent;

  switch (name) {
    case "Tune":
      IconComponent = TuneSvg;
      break;
    case "Edit":
      IconComponent = EditSvg;
      break;
    default:
      IconComponent = null;
  }

  // Render the selected SVG component as an Ant Design Icon
  return IconComponent ? <Icon component={IconComponent} {...props} /> : null;
};
