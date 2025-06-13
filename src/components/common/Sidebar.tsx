"use client"

import type React from "react"
import { Box, List, ListItem, Typography, useTheme } from "@mui/material"
import type { SidebarItem } from "../../types/customer"

interface SidebarProps {
  items: SidebarItem[]
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const theme = useTheme()

  return (
    <Box sx={{ height: "100%", backgroundColor: "#f8f9fa", pt: 0 }}>
      <List sx={{ p: 0 }}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              py: 2,
              px: 3,
              backgroundColor: item.active ? "#fff3e0" : "transparent",
              borderRight: item.active ? `3px solid ${theme.palette.primary.main}` : "none",
              "&:hover": {
                backgroundColor: item.active ? "#fff3e0" : "#f0f0f0",
              },
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <span
                className="material-icons"
                style={{
                  color: item.active ? theme.palette.primary.main : theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </span>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: item.active ? 600 : 400,
                  color: item.active ? theme.palette.primary.main : theme.palette.text.primary,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
