import { Box, Container, Typography, Grid, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/app/store";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from "recharts";
import { Button } from "@mui/material";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { exportToCsv } from '../utils/csvExport.ts';


const COLORS = [
  "#0088FE", // Blue
  "#FF8042", // Orange
  "#00C49F", // Teal
  "#FFBB28", // Yellow
  "#AA00FF", // Purple
  "#FF00AA", // Pink
  "#4CAF50", // Green
  "#F44336", // Red
  "#2196F3", // Sky Blue
  "#9C27B0", // Violet
  "#FF9800", // Deep Orange
  "#795548", // Brown
  "#607D8B", // Blue Grey
  "#E91E63", // Rose
  "#00BCD4"  // Cyan
];


const Dashboard = () => {
  const users = useSelector((state: RootState) => state.users.users);

  const totalUsers = users.length;
  const avgAge = totalUsers
    ? Math.round(users.reduce((acc, u) => acc + u.age, 0) / totalUsers)
    : 0;
  const uniqueDepts = [...new Set(users.map((u) => u.company.department))];
  const uniqueCities = [...new Set(users.map((u) => u.address.city))];
  const uniqueEyeColors = [...new Set(users.map((u) => u.eyeColor))];

    // CSV Export Handler
  const handleExportData = () => {
    const exportData = users.map(user => ({
      'Full Name': `${user.firstName} ${user.lastName}`,
      'Age': user.age,
      'Gender': user.gender,
      'Email': user.email,
      'Phone': user.phone,
      'Blood Group': user.bloodGroup,
      'Eye Color': user.eyeColor,
      'Department': user.company.department,
      'Job Title': user.company.title,
      'University': user.university,
      'City': user.address.city,
      'State': user.address.state,

    }));    const filename = `dashboard_export_${new Date().toISOString().split('T')[0]}.csv`;
            exportToCsv(exportData, filename);
  };

  // Pie: By Department
  const usersByDept = uniqueDepts.map((dept) => ({
    name: dept,
    value: users.filter((u) => u.company.department === dept).length,
  }));



  // Linear: Blood Group % (for linear progress bars)
  const bloodGroups = [...new Set(users.map((u) => u.bloodGroup))];
  const bloodData = bloodGroups.map((group) => {
    const count = users.filter((u) => u.bloodGroup === group).length;
    return {
      group,
      percentage: totalUsers ? Math.round((count / totalUsers) * 100) : 0,
    };
  });

  // Donut chart: Gender
  const femaleCount = users.filter((u) => u.gender === "Female").length;
  const maleCount = users.filter((u) => u.gender === "Male").length;
  const genderData = [
    { name: "Female", value: femaleCount },
    { name: "Male", value: maleCount },
  ];

  // Bar: University vs Company Department
  const uniDeptPairs: Record<string, Record<string, number>> = {};
  users.forEach((u) => {
    const uni = u.university || "Unknown";
    const dept = u.company.department;
    if (!uniDeptPairs[uni]) uniDeptPairs[uni] = {};
    if (!uniDeptPairs[uni][dept]) uniDeptPairs[uni][dept] = 0;
    uniDeptPairs[uni][dept]++;
  });
  const barDataUniDept = Object.entries(uniDeptPairs).map(([uni, deptCounts]) => ({
    university: uni,
    ...deptCounts,
  }));
  const departmentKeys = uniqueDepts;

  // 🟡 Line Chart Data: Blood Group vs Eye Color
  const getBloodEyeData = () => {
    return bloodGroups.map((group) => {
      const groupUsers = users.filter((u) => u.bloodGroup === group);
      const totalInGroup = groupUsers.length;

      const entry: any = { group };
      uniqueEyeColors.forEach((eye) => {
        const count = groupUsers.filter((u) => u.eyeColor === eye).length;
        entry[eye] = totalInGroup ? Number(((count / totalInGroup) * 100).toFixed(1)) : 0;
      });

      return entry;
    });
  };
  const bloodEyeData = getBloodEyeData();

  // Summary cards
  const summaryCards = [
    { label: "Total Employees", value: totalUsers, subtitle: "+12% from last month" },
    { label: "Active Departments", value: uniqueDepts.length, subtitle: "+2 new this quarter" },
    { label: "Average Age", value: avgAge, subtitle: "Years old" },
    { label: "Unique Cities", value: uniqueCities.length, subtitle: "+8% since last year" },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt:5, mb:5,width: "95%", padding: "1px 20px" }}>

<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent: "space-between",
    gap: 2,
    mb: 3,
  }}
>
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 600 }}>
      Dashboard Overview
    </Typography>
    <Typography variant="body1" sx={{ color: "text.secondary" }}>
      Comprehensive analytics and insights for your workforce
    </Typography>
  </Box>

  <Button
    variant="contained"
    onClick={handleExportData}    
    startIcon={<FileDownloadRoundedIcon />}
    sx={{
      bgcolor: "#1976d2",
      textTransform: "none",
      px: 3,
      '&:hover': { bgcolor: "#115293" },
    }}
  >
    Export Data
  </Button>
</Box>

           

      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {summaryCards.map((item, idx) => (
          <Grid size={{xs:12,sm:6, md:3, }}  key={idx}>
            <Box
              sx={{
                bgcolor: "#f9fafb",
                borderRadius: 2,
                height: 140,
                px: 5,
                py: 2,
                boxShadow: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Column on mobile, row on desktop
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 4,
                  transform: "scale(1.02)",
                },
              }}
            >
              {/* Image Box */}
              <Box sx={{ order: { xs: 1, md: 0 }, mb: { xs: 1, md: 0 } }}>
                <img
                  src={`/icons/icon${idx + 1}.png`}
                  alt="icon"
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </Box>

              {/* Text Box */}
              <Box sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: "center", md: "left" } }}>
                <Typography variant="subtitle2" color="#555">
                  {item.label}
                </Typography>
                <Typography variant="h4" fontWeight={600}>
                  {item.value}
                </Typography>
                <Typography variant="caption" color="green">
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
</Grid>



              {/* Charts: Department & City */}
              <Grid container spacing={4} >
                <Grid size={{xs:12, md:6}} sx={{ mt:5,  height: 350, bgcolor: 'white', borderRadius: 2, p: 2, boxShadow: 1 , transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.01)',
        },}}>
                  <Typography variant="h6">Users by Department</Typography>
                  <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                      <Pie data={usersByDept} dataKey="value" nameKey="name" outerRadius={90} label>
                        {usersByDept.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>


      <Grid size={{xs:12, md:6}} sx={{ mt:5,  height: 350, bgcolor: 'white', borderRadius: 2, p: 2.7, boxShadow: 1 , transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.01)',
        },}}>
    <Typography variant="h6">Blood Group vs Eye Color (%)</Typography>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={bloodEyeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="group" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        {uniqueEyeColors.map((color, idx) => (
          <Line
            key={color}
            type="monotone"
            dataKey={color}
            stroke={`hsl(${idx * 60}, 70%, 50%)`}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </Grid>
</Grid> 

          <Grid container spacing={2}>
              {/* Blood Type Distribution */}
              <Grid size={{xs:12, md:6}} sx={{ mt:5,  height: 350, bgcolor: 'white', borderRadius: 2, p: 2.7, boxShadow: 1 , transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.01)',
        },}} >
                  <Box >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Blood Type Distribution
                    </Typography>
                    {bloodData.map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ width: 40 }}>
                          {item.group}
                        </Typography>
                        <Box sx={{ flexGrow: 1, mx: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={item.percentage}
                            sx={{
                              height: 8,
                              borderRadius: 5,
                              [`& .MuiLinearProgress-bar`]: {
                                backgroundColor: COLORS[idx % COLORS.length]
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ minWidth: 30 }}>
                          {item.percentage}%
                        </Typography>
                      </Box>
                    ))}
                  </Box>
              </Grid>

              {/* Gender Distribution */}
                <Grid size={{xs:12, md:6}} sx={{ mt:5,  height: 350, bgcolor: 'white', borderRadius: 2, p: 2.7, boxShadow: 1 , transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.01)',
        },}}>
                  <Box >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Gender Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={genderData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          label
                        >
                          {genderData.map((_, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
            </Grid>


        {/* University vs Department Bar Chart */}
        <Grid size={{xs:12, md:6}} sx={{ mt:5,  height: 400, bgcolor: 'white', borderRadius: 2, p: 2.7, boxShadow: 1 , transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.01)',
        },}}>
          <Typography variant="h6">University vs Company Department</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={barDataUniDept}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="university" />
              <YAxis />
              <Tooltip />
              <Legend  />
              {departmentKeys.map((dept, idx) => (
                <Bar key={dept} dataKey={dept} stackId="a" fill={COLORS[idx % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Grid>
 
</Container>
  );
};

export default Dashboard;


