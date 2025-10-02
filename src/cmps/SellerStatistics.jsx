// MUI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BarChartIcon from '@mui/icons-material/BarChart'

export function SellerStatistics({ orders }) {
    // Calculate statistics
    const getStatistics = () => {
        if (!orders.length) return { totalRevenue: 0, activeOrders: 0, completedOrders: 0, avgOrderValue: 0 }
        
        const totalRevenue = orders.reduce((sum, order) => sum + (order.packageDeal?.total || 0), 0)
        const activeOrders = orders.filter(order => ['pending', 'approve'].includes(order.status)).length
        const completedOrders = orders.filter(order => order.status === 'deliver').length
        const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0
        
        return { totalRevenue, activeOrders, completedOrders, avgOrderValue }
    }

    const stats = getStatistics()

    return (
        <div className="stats-section">
            <div className="stats-grid">
                <div className="stat-card revenue">
                    <div className="stat-icon">
                        <AttachMoneyIcon />
                    </div>
                    <div className="stat-content">
                        <h3>${stats.totalRevenue.toFixed(2)}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
                <div className="stat-card active">
                    <div className="stat-icon">
                        <AssignmentIcon />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.activeOrders}</h3>
                        <p>Active Orders</p>
                    </div>
                </div>
                <div className="stat-card completed">
                    <div className="stat-icon">
                        <CheckCircleIcon />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.completedOrders}</h3>
                        <p>Completed Orders</p>
                    </div>
                </div>
                <div className="stat-card average">
                    <div className="stat-icon">
                        <BarChartIcon />
                    </div>
                    <div className="stat-content">
                        <h3>${stats.avgOrderValue.toFixed(2)}</h3>
                        <p>Avg Order Value</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
