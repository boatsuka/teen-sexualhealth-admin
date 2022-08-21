import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import React from "react";
import * as axios from "axios";
import { Box, Card, CardContent, Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = React.useState([]);

  const columns = [
    {
      field: "user_loginname",
      headerName: "ชื่อผู้ใช้งาน",
      width: 150,
      editable: true,
    },
    {
      field: "user_full_name",
      headerName: "ชื่อ-นามสกุล",
      width: 150,
      editable: true,
    },
    {
      field: "user_email",
      headerName: "อีเมล์",
      width: 200,
      editable: true,
    },
    {
      field: "user_telephone",
      headerName: "เบอร์โทรศัพท์",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => console.log(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => DeleteUserData(params.id)}
        />,
      ],
    },
  ];

  const GetUserData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/user/all`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const DeleteUserData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/user/delete/${id}`)
      .then(() => {
        toast.success("ลบข้อมูลสำเร้จแล้ว");
        GetUserData();
      })
      .catch((err) => {
        toast.error(`เกิดข้อผิดพลาด ${err}`);
      });
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
          <Button>

          </Button>
      </GridToolbarContainer>
    );
  };

  React.useEffect(() => {
    GetUserData();
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{10}</Typography>
              <Typography variant="p">
                {10} {10}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{10}</Typography>
              <Typography variant="p">
                {10} {10}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{10}</Typography>
              <Typography variant="p">
                {10} {10}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          Add User
        </Button>

        <Grid item xs={8} sx={5}>
          <Box sx={{ height: "70vh", width: "150%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{
                Toolbar: CustomToolbar,
              }}
              getRowId={(row) => row.user_id}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
