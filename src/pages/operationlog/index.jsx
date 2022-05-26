import dayjs from "dayjs";
import { createEffect, createSignal, For, onMount } from "solid-js";
import request from "../../api/request";
import LogsGroup from "./components/LogsGroup";

const OperationLogs = () => {
  const [logs, setLogs] = createSignal([]);

  const [date, setDate] = createSignal(dayjs().format("YYYY-MM-DD"));

  const moreData = () => {
    let day = dayjs(date(), "YYYY-MM-DD");
    let newDate = day.subtract(11, "day");
    setDate(newDate.format("YYYY-MM-DD"));
  };

  createEffect(async () => {
    let resp = await request.operationLogs(date());
    let list = resp.data.data;
    let newLogs = [...logs()];

    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      let withdrawDate = item.operationTime.substring(0, 10);
      let curGroup = null;
      let curIndex = 0;
      for (let j = 0; j < newLogs.length; j++) {
        if (newLogs[j].date == withdrawDate) {
          curIndex = j;
          curGroup = newLogs[j];
          break;
        }
      }
      if (curGroup == null) {
        curGroup = {
          date: withdrawDate,
          items: [],
        };
        curGroup.items.push(item);
        newLogs.push(curGroup);
      } else {
        curGroup.items.push(item);
      }
    }

    setLogs(newLogs);
  }, [date()]);
  return (
    <div class="m-2">
      <For each={logs()} fallback={() => <div>加载中.......</div>}>
        {(item) => <LogsGroup data={item}></LogsGroup>}
      </For>
      <div class="text-center">
        <button
          class="btn"
          onClick={() => {
            moreData();
          }}
        >
          加载更多(每次10天数据)
        </button>
      </div>
      <a
        href={
          import.meta.env.VITE_API_URL +
          "/export?t=" +
          localStorage.getItem("token")
        }
        class="btn btn-circle fixed bottom-5 right-10"
        target="_blank"
      >
        导出
      </a>
    </div>
  );
};

export default OperationLogs;
