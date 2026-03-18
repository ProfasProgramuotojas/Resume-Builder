import React, { useState } from "react";

type ItemProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

export const AccordionItem = ({ children }: ItemProps) => {
  return children;
};

export const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const items = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<ItemProps>[];

  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;

        return (
          <div key={index} className="border rounded">
            <button
              className="w-full text-left p-3 bg-gray-100 flex justify-between items-center"
              onClick={() => setActiveIndex(isOpen ? null : index)}
            >
              <span>{item.props.label}</span>
              <span>{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="p-3 border-t">{item.props.children}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
