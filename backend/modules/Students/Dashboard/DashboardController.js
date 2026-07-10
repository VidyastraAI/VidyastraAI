const Dashboard = require("./DashboardModel");

exports.getDashboard = async (req, res) => {
    try {

        let dashboard;

        // Future: when auth team adds req.user
        if (req.user && req.user.id) {
            dashboard = await Dashboard.findOne({
                studentId: req.user.id
            });
        } 
        // Current fallback for testing
        else {
            dashboard = await Dashboard.findOne();
        }

        if (!dashboard) {
            return res.status(404).json({
                success: false,
                message: "Dashboard data not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: dashboard
        });

    } catch (error) {
        console.error("Dashboard Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};