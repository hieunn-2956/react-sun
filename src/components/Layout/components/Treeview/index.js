import * as React from "react";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const treelist = [
  {
    title: "Appliances",
    childrens: [
      {
        title: "Dishwasher",
        childrens: [{ title: "Built-In Diswasher" }],
      },
      {
        title: "Fans",
        childrens: [
          {
            title: "Ceiling Fans",
            childrens: [
              { title: "Small Ceiling Fans" },
              { title: "Big Ceiling Fans" },
            ],
          },
          { title: "Floor & Box Fans" },
          { title: "Table & Portable Fans" },
          { title: "Window Fans" },
        ],
      },
      { title: "Freezers & Ice Makers" },
      { title: "Heater" },
      { title: "Humidifiers" },
      { title: "Microwaves" },
      { title: "Range, Cooktops & Ovens" },
      { title: "Refrigerator" },
      { title: "Small Kitchen Appliances" },
      { title: "Washer & Dryers" },
    ],
  },
  {
    title: "Audio",
    childrens: [
      { title: "Auxiliary Input Cables" },
      { title: "Cables & Chargers" },
      { title: "Cases & Armbands" },
      { title: "FM Transmitter" },
      { title: "Docks,Radios & Boomboxes" },
      { title: "Headphones" },
      { title: "Home Audio" },
      { title: "Home Audio Accessories" },
      { title: "In-Home Speakers" },
      { title: "Ipod and MP3 Players" },
    ],
  },
];

const Treeview = () => {
  const renderTree = (categories) => {
    let renderList = [];
    for (let category of categories) {
      renderList.push(
        <TreeItem nodeId={category.title} label={category.title}>
          {category.childrens &&
            category.childrens.length &&
            renderTree(category.childrens)}
        </TreeItem>
      );
    }
    return renderList;
  };

  return (
    <TreeView
      aria-label='file system navigator'
      defaultCollapseIcon={<BsChevronDown />}
      defaultExpandIcon={<BsChevronRight />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderTree(treelist)}
    </TreeView>
  );
};

export default Treeview;
