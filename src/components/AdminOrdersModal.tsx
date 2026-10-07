import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  Trash2,
  Radio,
  Clock,
  Package,
  Sparkles,
  ArrowUpDown,
  CreditCard,
  RefreshCw,
} from 'lucide-react';
import {
  subscribeToOrders,
  updateOrderStatus,
  deleteOrder,
  OrderRecord,
} from '../services/firebase';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [newOrderNotice, setNewOrderNotice] = useState<string | null>(null);
  const [prevCount, setPrevCount] = useState<number>(0);

  // Real-time synchronization without manual refresh
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);

    const unsubscribe = subscribeToOrders(
      (newOrders) => {
        // Check if a new order just came in
        if (prevCount > 0 && newOrders.length > prevCount) {
          const newest = newOrders[0];
          setNewOrderNotice(`🔔 새 주문 도착: [${newest.id}] ${newest.customerName}님 (${newest.totalAmount.toLocaleString()}원)`);
          setTimeout(() => setNewOrderNotice(null), 5000);
        }
        setPrevCount(newOrders.length);
        setOrders(newOrders);
        setIsLoading(false);
      },
      (error) => {
        console.error('Subscription error:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, prevCount]);

  if (!isOpen) return null;

  // Change order status directly
  const handleUpdateStatus = async (orderId: string, newStatus: OrderRecord['status']) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      // Real-time listener will automatically update state, but we also optimistically update
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err: any) {
      alert('상태 변경에 실패했습니다: ' + (err?.message || 'Error'));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!window.confirm(`주문번호 [${orderId}]를 삭제하시겠습니까?`)) return;
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err: any) {
      alert('주문 삭제 실패: ' + (err?.message || 'Error'));
    }
  };

  // Filter orders by search & status
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      o.phone?.includes(searchQuery.trim()) ||
      o.id?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      o.address?.toLowerCase().includes(searchQuery.trim().toLowerCase());

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate quick metrics
  const paidCount = orders.filter((o) => o.status === 'paid' || o.status === 'pending').length;
  const shippedCount = orders.filter((o) => o.status === 'shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'paid':
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-black">
            <Clock className="w-3.5 h-3.5" />
            결제완료
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-black">
            <Package className="w-3.5 h-3.5" />
            상품준비중
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full text-xs font-black">
            <Truck className="w-3.5 h-3.5 text-purple-600" />
            배송중
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-black">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            배송완료
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-xs font-black">
            취소됨
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold">
            {status}
          </span>
        );
    }
  };

  const getPaymentName = (method: string) => {
    switch (method) {
      case 'card': return '신용/체크카드';
      case 'naverpay': return '네이버페이';
      case 'kakaopay': return '카카오페이';
      case 'tosspay': return '토스페이';
      case 'vbank': return '무통장입금';
      default: return method;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F0] w-full max-w-6xl rounded-3xl border-2 border-[#D9CDB7] shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Header with Real-Time Indicator */}
        <div className="bg-[#2D5A27] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-black bg-white/20 px-2.5 py-0.5 rounded text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                실시간 자동 동기화 (새로고침 불필요)
              </span>
              <span className="text-xs text-[#C5E2BF]">
                새 주문 발생 시 즉시 표에 자동 추가됩니다
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              판매자 주문관리 대시보드
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Real-time Order Alert Banner */}
        {newOrderNotice && (
          <div className="bg-[#EAF5E7] border-b border-[#C6E2C1] px-6 py-2.5 text-sm text-[#1E4319] font-black flex items-center justify-between animate-bounce">
            <span>{newOrderNotice}</span>
            <button
              onClick={() => setNewOrderNotice(null)}
              className="text-xs text-[#4F6849] hover:underline cursor-pointer"
            >
              닫기
            </button>
          </div>
        )}

        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-white border-b border-[#E3DAC7] shrink-0">
          <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#DFD4C0]">
            <span className="text-xs font-bold text-[#6D7A68] block mb-1">총 접수 주문</span>
            <div className="text-2xl sm:text-3xl font-black text-[#1E3719]">
              {orders.length} <span className="text-sm font-semibold text-[#667261]">건</span>
            </div>
          </div>
          <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#DFD4C0]">
            <span className="text-xs font-bold text-blue-700 block mb-1">결제완료 (출고대기)</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-700">
              {paidCount} <span className="text-sm font-semibold text-[#667261]">건</span>
            </div>
          </div>
          <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#DFD4C0]">
            <span className="text-xs font-bold text-purple-700 block mb-1">배송중</span>
            <div className="text-2xl sm:text-3xl font-black text-purple-700">
              {shippedCount} <span className="text-sm font-semibold text-[#667261]">건</span>
            </div>
          </div>
          <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#DFD4C0]">
            <span className="text-xs font-bold text-emerald-700 block mb-1">배송완료</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">
              {deliveredCount} <span className="text-sm font-semibold text-[#667261]">건</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 bg-[#FAF7F0] border-b border-[#E3DAC7] flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="주문번호, 주문자명, 연락처 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#D5C7B0] text-sm text-[#2C3827] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
            />
            <Search className="w-4 h-4 text-[#889481] absolute left-3 top-3.5" />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `전체 (${orders.length})` },
              { id: 'paid', label: `결제완료 (${paidCount})` },
              { id: 'shipped', label: `배송중 (${shippedCount})` },
              { id: 'delivered', label: `배송완료 (${deliveredCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-[#2D5A27] text-white shadow-xs'
                    : 'bg-white text-[#52604F] hover:bg-[#F2ECE0] border border-[#D8CCB7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="p-3 sm:p-6 overflow-auto flex-1 bg-[#FAF7F0]">
          {isLoading && orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#DFD5C2]">
              <RefreshCw className="w-8 h-8 text-[#2D5A27] animate-spin mx-auto mb-3" />
              <p className="text-base text-[#616D5D] font-bold">실시간 주문 데이터를 불러오는 중입니다...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#DFD5C2]">
              <Package className="w-12 h-12 text-[#99A695] mx-auto mb-3" />
              <h4 className="text-xl font-black text-[#2A3B27] mb-1">
                {searchQuery ? '검색 결과와 일치하는 주문이 없습니다' : '아직 접수된 주문이 없습니다'}
              </h4>
              <p className="text-sm text-[#6C7868]">
                고객이 결제 화면에서 주문하기를 클릭하면, 새로고침 없이 이곳에 실시간으로 표시됩니다.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-[#D9CDB7] shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#F4ECE0] border-b-2 border-[#DDD1BD] text-[#2F3E2C] text-xs sm:text-sm font-black uppercase tracking-wider">
                    <th className="py-4 px-4 w-[180px]">주문번호 / 일시</th>
                    <th className="py-4 px-4 w-[240px]">주문자 정보</th>
                    <th className="py-4 px-4">상품 / 결제금액</th>
                    <th className="py-4 px-4 w-[120px] text-center">상태</th>
                    <th className="py-4 px-4 w-[220px] text-center">상태 변경 (원클릭)</th>
                    <th className="py-4 px-3 w-[50px] text-center">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE0] text-sm text-[#263523]">
                  {filteredOrders.map((order) => {
                    const isUpdating = updatingId === order.id;

                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-[#FAF8F3] transition-colors"
                      >
                        {/* 1. 주문번호 / 일시 */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-mono font-black text-sm sm:text-base text-[#2D5A27]">
                            {order.id}
                          </div>
                          <div className="text-xs text-[#7D8B7A] flex items-center gap-1 mt-1">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : '-'}
                            </span>
                          </div>
                        </td>

                        {/* 2. 주문자 정보 (이름, 연락처, 배송지) */}
                        <td className="py-4 px-4 align-top space-y-1">
                          <div className="flex items-center gap-2">
                            <strong className="text-base text-[#192F17]">
                              {order.customerName}
                            </strong>
                            <a
                              href={`tel:${order.phone}`}
                              className="text-xs text-[#2D5A27] font-bold hover:underline flex items-center gap-0.5 bg-[#EAF2E8] px-2 py-0.5 rounded"
                            >
                              <Phone className="w-3 h-3" />
                              {order.phone}
                            </a>
                          </div>

                          <div className="text-xs text-[#52604F] flex items-start gap-1 leading-snug">
                            <MapPin className="w-3.5 h-3.5 text-[#2D5A27] shrink-0 mt-0.5" />
                            <span>
                              {order.address} {order.detailAddress}
                            </span>
                          </div>

                          {order.requestNote && (
                            <div className="text-[11px] text-[#7F8D7C] bg-[#F7F4EC] px-2 py-0.5 rounded">
                              요청: {order.requestNote}
                            </div>
                          )}
                        </td>

                        {/* 3. 상품 / 결제금액 */}
                        <td className="py-4 px-4 align-top space-y-1">
                          <div className="font-extrabold text-[#1F371C]">
                            {order.productName}{' '}
                            <span className="text-xs text-[#2D5A27] font-bold">
                              ({order.bundleCount}박스 × {order.quantity}개)
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <strong className="text-base font-black text-[#2D5A27]">
                              {order.totalAmount?.toLocaleString()}원
                            </strong>
                            <span className="text-[#788574] px-1.5 py-0.5 bg-[#F2ECE0] rounded text-[11px] font-bold">
                              {getPaymentName(order.paymentMethod)}
                            </span>
                          </div>
                        </td>

                        {/* 4. 상태 배지 */}
                        <td className="py-4 px-4 align-middle text-center">
                          {getStatusBadge(order.status)}
                        </td>

                        {/* 5. 상태 변경 버튼 (배송중, 배송완료) */}
                        <td className="py-4 px-4 align-middle text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* "배송중" 버튼 */}
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(order.id, 'shipped')}
                              disabled={isUpdating}
                              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                                order.status === 'shipped'
                                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                                  : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                              }`}
                              title="상태를 '배송중'으로 변경"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>배송중</span>
                            </button>

                            {/* "배송완료" 버튼 */}
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(order.id, 'delivered')}
                              disabled={isUpdating}
                              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                                order.status === 'delivered'
                                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                              }`}
                              title="상태를 '배송완료'로 변경"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>배송완료</span>
                            </button>
                          </div>

                          {/* Fallback back to "결제완료" option */}
                          {order.status !== 'paid' && (
                            <div className="mt-1 text-center">
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'paid')}
                                className="text-[11px] text-[#7D8B7A] hover:text-[#2D5A27] underline cursor-pointer"
                              >
                                결제완료 상태로 되돌리기
                              </button>
                            </div>
                          )}
                        </td>

                        {/* 6. 삭제 관리 버튼 */}
                        <td className="py-4 px-3 align-middle text-center">
                          <button
                            type="button"
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="주문 내역 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F2ECE0] border-t border-[#DDD1BE] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#63725F] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              새 주문이 들어오면 실시간 리스너를 통해 <strong>새로고침 없이 자동으로 표에 즉시 추가</strong>됩니다.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white border border-[#D0C2AB] text-[#223B1E] font-black hover:bg-[#FAF7F0] cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
