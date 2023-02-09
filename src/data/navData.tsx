import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
export const navData = [
    {
        id: 0,
        icon: <StorefrontIcon/>,
        text: "Orders",
        link: "/"
    },
    {
        id: 1,
        icon: <InventoryIcon/>,
        text: "Products",
        link: "/productpage"
    },
    {
            id: 2,
            icon: <BarChartIcon/>,
            text: "Order backlog",
            link: "/ordersvisualization"
    }
]