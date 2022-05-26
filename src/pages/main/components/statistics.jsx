import { useNavigate } from "solid-app-router";
import { createSignal, createEffect } from "solid-js";

import request from "../../../api/request";

export default () => {
  const [statistics, setStatistics] = createSignal({
    allWithdrawAmount: 0,
    allWithdrawCount: 0,
    todayWithdrawAmount: 0,
  });

  const toLogs = () => {
    window.location.href = "/operationlogs";
  };

  const handleFetchStatistics = async () => {
    let res = await request.statistics();

    setStatistics(res.data.data);
  };

  createEffect(() => {
    handleFetchStatistics();
  }, []);

  return (
    <div
      class="shadow bg-blue-500 mb-10  rounded-lg p-1.5 flex-col"
      onClick={toLogs}
    >
      <div class="grid grid-cols-3 gap-1 ">
        <p class="mb-5 row-span-1 col-span-3 text-gray-200 text-sm">
          待处理提现
        </p>
        <div class="col-span-1 flex flex-col justify-center items-center">
          <p class="text-sm text-white">总额</p>
          <span class="text-lg text-white">
            ￥{statistics().allWithdrawAmount}
          </span>
        </div>
        <div class="col-span-1 flex flex-col justify-center items-center">
          <p class="text-sm text-white">笔数</p>
          <span class="text-lg text-white">
            {statistics().allWithdrawCount}
          </span>
        </div>
        <div class="col-span-1 flex flex-col justify-center items-center">
          <p class="text-sm text-white">今日</p>
          <span class="text-lg text-white">
            ￥{statistics().todayWithdrawAmount}
          </span>
        </div>
      </div>
    </div>
  );
};
