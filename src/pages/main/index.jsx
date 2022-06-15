import axios from "axios";
import {
  createEffect,
  createSignal,
  For,
  Switch,
  Match,
  onMount,
} from "solid-js";

import ConfirmModal from "./components/modal/confirmModal";
import RejectModal from "./components/modal/rejectModal";
import { useNavigate } from "solid-app-router";
import request from "../../api/request";
import Statistics from "./components/statistics";

const bankMap = {
  1002: "工商银行",
  1005: "农业银行",
  1003: "建设银行",
  1026: "中国银行",
  1020: "交通银行",
  1001: "招商银行",
  1066: "邮储银行",
  1006: "民生银行",
  1010: "平安银行",
  1021: "中信银行",
  1004: "浦发银行",
  1009: "兴业银行",
  1022: "光大银行",
  1027: "广发银行",
  1025: "华夏银行",
  1056: "宁波银行",
  4836: "北京银行",
  1024: "上海银行",
  1054: "南京银行",
  4755: "长子县融汇村镇银行",
  4216: "长沙银行",
  4051: "浙江泰隆商业银行",
  4753: "中原银行",
  4761: "企业银行（中国）",
  4036: "顺德农商银行",
  4752: "衡水银行",
  4756: "长治银行",
  4767: "大同银行",
  4115: "河南省农村信用社",
  4150: "宁夏黄河农村商业银行",
  4156: "山西省农村信用社",
  4166: "安徽省农村信用社",
  4157: "甘肃省农村信用社",
  4153: "天津农村商业银行",
  4113: "广西壮族自治区农村信用社",
  4108: "陕西省农村信用社",
  4076: "深圳农村商业银行",
  4052: "宁波鄞州农村商业银行",
  4764: "浙江省农村信用社联合社",
  4217: "江苏省农村信用社联合社",
  4072: "江苏紫金农村商业银行股份有限公司",
  4769: "北京中关村银行股份有限公司",
  4778: "星展银行（中国）有限公司",
  4766: "枣庄银行股份有限公司",
  4758: "海口联合农村商业银行股份有限公司",
  4763: "南洋商业银行（中国）有限公司",
};

function MainIndex() {
  const nav = useNavigate();
  let token = localStorage.getItem("token");
  if (!token) {
    nav("/login");
    return;
  }

  const handleFetchList = async () => {
    let res = await request.withdrawList(1, 20);

    if (res.data.data != null) {
      setWithdrawLogs(res.data.data);
    }
  };

  let currentItemId = 0;

  const [withdrawLogs, setWithdrawLogs] = createSignal([]);

  const [confirmModalStatus, setConfirmModalStatus] = createSignal(false);

  const [rejectModalStatus, setRejectModalStatus] = createSignal(false);

  // confirm modal
  const showConfirmModal = (id) => {
    currentItemId = id;
    setConfirmModalStatus(true);
  };

  const handlerConfirm = async () => {
    let res = await request.confirm(currentItemId);

    if (res.data.code !== 0) {
      alert(res.data.message);
      return;
    }

    setWithdrawLogs(withdrawLogs().filter((item) => item.id != currentItemId));

    setConfirmModalStatus(false);
  };

  // reject modal
  const showRejectModal = (id) => {
    currentItemId = id;
    setRejectModalStatus(true);
  };

  const handlerReject = async (rejectMessage) => {
    let res = await request.reject(currentItemId, rejectMessage);

    if (res.data.code !== 0) {
      alert(res.data.message);
      return;
    }

    setWithdrawLogs(withdrawLogs().filter((item) => item.id != currentItemId));
    setRejectModalStatus(false);
  };

  onMount(() => {
    handleFetchList();
  });

  return (
    <div class="container p-3.5 text-center	">
      <Statistics />
      <Switch>
        <Match when={withdrawLogs().length > 0}>
          <For each={withdrawLogs()}>
            {(item) => (
              <div class="text-left transition-all mb-3 flex flex-row justify-between p-2.5 rounded shadow">
                <div class="text-sm flex flex-col justify-self-start">
                  <span class="text-gray-400">
                    金额：
                    <span class="text-red-500 font-bold">
                      ￥{item.amount / 100}
                    </span>
                  </span>
                  <span class="text-gray-400">{item.name}</span>
                  <span class="text-gray-400">{bankMap[item.bankCode]}</span>
                  <span class="text-gray-400">
                    <span class="font-bold text-gray-500">{item.bankCard}</span>
                  </span>
                  <span class="text-gray-400">{item.time}</span>
                </div>
                <div class="flex flex-col justify-center gap-3">
                  <button
                    onClick={() => showConfirmModal(item.id)}
                    class="btn btn-success btn-sm"
                  >
                    确认拨款
                  </button>
                  <button
                    class="btn btn-error btn-sm"
                    onClick={() => showRejectModal(item.id)}
                  >
                    驳回
                  </button>
                </div>
              </div>
            )}
          </For>
        </Match>

        <Match when={withdrawLogs().length == 0}>
          <button onClick={() => handleFetchList()} class="btn">
            没有数据了，点击刷新试试
          </button>
        </Match>
      </Switch>

      <ConfirmModal
        InitStatus={confirmModalStatus()}
        onOk={handlerConfirm}
        onCancel={() => {
          setConfirmModalStatus(false);
        }}
      ></ConfirmModal>

      <RejectModal
        InitStatus={rejectModalStatus()}
        onCancel={() => {
          setRejectModalStatus(false);
        }}
        onOk={handlerReject}
      ></RejectModal>
    </div>
  );
}

export default MainIndex;
