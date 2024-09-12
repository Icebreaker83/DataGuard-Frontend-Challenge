import TheToaster from "./components/TheToaster.vue";
import { useAlertsStore } from "./store";

const useAlerts = () => {
  const { showAlert } = useAlertsStore();
  return {
    showAlert,
  };
};

export { TheToaster, useAlerts };
