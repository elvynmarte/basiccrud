import { VscWarning, VscInfo, VscError, VscCheck } from "react-icons/vsc";

export default function Button(options: any) {
  const { type, msg } = options;

  const color = [
    {
      type: "success",
      color: "#abedab",
      bcolor: "darkgreen",
      icon: <VscCheck size={18} />,
    },
    {
      type: "danger",
      color: "#eb9393",
      bcolor: "darkred",
      icon: <VscError size={18} />,
    },
    {
      type: "warning",
      color: "#ebcb90",
      bcolor: "#915102",
      icon: <VscWarning size={18} />,
    },
    {
      type: "info",
      color: "#aaaaed",
      bcolor: "darkblue",
      icon: <VscInfo size={18} />,
    },
  ];

  const alertcolor = color.filter((c) => c.type == type)[0];

  return (
    <button
      style={{
        padding: 10,
        borderRadius: 8,
        margin: 5,
        border: `1px solid ${alertcolor.bcolor}`,
        backgroundColor: alertcolor.color,
        color: alertcolor.bcolor,
      }}
    >
      {alertcolor.icon} {msg}
    </button>
  );
}

const styles = {};
