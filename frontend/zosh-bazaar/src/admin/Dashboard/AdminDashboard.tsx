import Navbar from "../../CommonComponents/Navbar";
import AdminDrawerList from "../Sidebar/AdminDrawerList";
import AdminRoutes from "../../Routes/AdminRoutes";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { useEffect } from "react";
import { fetchHomeCategory } from "../../Redux Toolkit/features/admin/adminSlice";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const AdminDashboard = () => {

  const dispatch = useAppDispatch()


  useEffect(()=> {
    dispatch(fetchHomeCategory({}))
  }, [])

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <div className="min-h-screen ">
      <Navbar DrawerList={AdminDrawerList} />

      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full">
          <AdminDrawerList />
        </div>
        <div className="p-10 w-full lg:w-[80%] overflow-y-auto">
          <div className="flex justify-end mb-4">
            <Button
              onClick={handleRefresh}
              variant="outlined"
              startIcon={<RefreshIcon />}
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Refresh
            </Button>
          </div>
          <AdminRoutes />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

