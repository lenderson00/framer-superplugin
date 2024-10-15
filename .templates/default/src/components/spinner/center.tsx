import { Spinner } from "./index";

export const CenteredSpinner = () => (
  <div className="flex items-center justify-center py-10 min-h-[320px]">
    <div className="flex flex-col items-center justify-center">
      <Spinner inheritColor inline />
      <p className="text-tertiary text-center text-xs mt-2">Loading...</p>
    </div>
  </div>
);
