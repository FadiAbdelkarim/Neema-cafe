"use client";

import { type ComponentProps, createContext, use, useMemo } from "react";

import { cn } from "@/lib/utils";

export type FlipCardRotate = "x" | "y";

type FlipCardContextValue = {
  rotate: FlipCardRotate;
};

const FlipCardContext = createContext<FlipCardContextValue | null>(null);

const ROTATION_CLASS = {
  x: {
    flipped: "rotate-x-180",
    back: "rotate-x-180",
  },
  y: {
    flipped: "rotate-y-180",
    back: "rotate-y-180",
  },
} as const;

function useFlipCard() {
  const context = use(FlipCardContext);
  if (!context) {
    throw new Error("FlipCard.Front and FlipCard.Back must be used within <FlipCard>.");
  }
  return context;
}

type FlipCardRootProps = ComponentProps<"div"> & {
  rotate?: FlipCardRotate;
  flipped?: boolean;
};

function FlipCardRoot({ rotate = "y", flipped = false, className, children, ...props }: FlipCardRootProps) {
  const value = useMemo(() => ({ rotate }), [rotate]);

  return (
    <FlipCardContext.Provider value={value}>
      <div className={cn("perspective-[1000px]", className)} {...props}>
        <div
          className={cn(
            "relative h-full w-full rounded-md transition-transform duration-500 ease-out transform-3d will-change-transform motion-reduce:transition-none",
            flipped && ROTATION_CLASS[rotate].flipped,
          )}
        >
          {children}
        </div>
      </div>
    </FlipCardContext.Provider>
  );
}

type FlipCardFaceProps = ComponentProps<"div">;

function FlipCardFront({ className, ...props }: FlipCardFaceProps) {
  useFlipCard();

  return <div className={cn("absolute inset-0 backface-hidden", className)} {...props} />;
}

function FlipCardBack({ className, ...props }: FlipCardFaceProps) {
  const { rotate } = useFlipCard();

  return (
    <div
      className={cn("absolute inset-0 backface-hidden", ROTATION_CLASS[rotate].back, className)}
      {...props}
    />
  );
}

type FlipCardComponent = typeof FlipCardRoot & {
  Front: typeof FlipCardFront;
  Back: typeof FlipCardBack;
};

function FlipCard(props: FlipCardRootProps) {
  return <FlipCardRoot {...props} />;
}

const FlipCardWithFaces = FlipCard as FlipCardComponent;
FlipCardWithFaces.Front = FlipCardFront;
FlipCardWithFaces.Back = FlipCardBack;

export default FlipCardWithFaces;
export {
  FlipCardWithFaces as FlipCard,
  FlipCardBack,
  FlipCardFront,
  FlipCardRoot,
};

