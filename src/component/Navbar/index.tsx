import React from "react";

interface NavbarProps {
  colorScheme: "light" | "dark";
  toggleColorScheme: () => void;
  IconSun: React.ReactNode;
  IconMoon: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({
  colorScheme,
  toggleColorScheme,
  IconSun,
  IconMoon,
}) => {
  const isDark = colorScheme === "dark";

  return (
    <div className="navbar-wrapper">
      <div className="navbar-header">Manufac</div>
      <button
        onClick={() => toggleColorScheme()}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          border: "none",
          backgroundColor: isDark ? "white" : "black",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        aria-label="Toggle color scheme"
      >
        {isDark ? IconSun : IconMoon}
      </button>
    </div>
  );
};

export default Navbar;
