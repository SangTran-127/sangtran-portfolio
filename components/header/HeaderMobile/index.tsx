"use client";
import React, { useRef } from "react";
import { useDimensions } from "@/hooks";
import Link from "next/link";
import { ROUTE_LIST } from "../route-list";
import { motion, useCycle } from "framer-motion";
import "./header-mobile.css";
import { MenuToggle } from "./MenuToggle";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  // circle(24px at 66px 40px);
  closed: {
    clipPath: "circle(24px at 150px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const HeaderMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <div className="">
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          className="motion-nav"
        >
          <motion.div
            className="nav-mobile-background bg-dracula-purple"
            variants={sidebar}
          />
          <motion.ul variants={variants} className="mobile-nav-ul">
            {ROUTE_LIST.map(({ path, label }) => (
              <motion.li
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: { stiffness: 1000, velocity: -100 },
                    },
                  },
                  closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                      y: { stiffness: 1000 },
                    },
                  },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mobile-nav-li"
                key={path}
              >
                <div
                  className="mobile-nav-text-placeholder text-dracula-light"
                  style={!isOpen ? { display: "none" } : undefined}
                >
                  <Link key={path} href={path}>
                    {/* <MUILink sx={{ ml: 2, color: '#ffffff', width: '100px' }} className={clsx({ active: pathname === path })} onClick={() => toggleOpen()}>{label}</MUILink> */}
                    <button
                      className={clsx({
                        "text-dracula-green": pathname === path,
                      })}
                      onClick={() => toggleOpen()}
                    >
                      <p className="hover:text-dracula-blue">{label}</p>
                    </button>
                  </Link>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
      </div>
    </div>
  );
};

export default HeaderMobile;
