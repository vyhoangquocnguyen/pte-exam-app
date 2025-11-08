import DashboardPage from "./(dashboard)/dashboard/page";
import DashboardLayout from "./(dashboard)/layout";

const RootPage = () => {
  return (
    <div>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    </div>
  );
};

export default RootPage;
