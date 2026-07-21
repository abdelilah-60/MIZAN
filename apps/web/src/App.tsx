import { useState, useEffect, useCallback, lazy, Suspense, useRef } from "react";
import { useAuth } from "./hooks/useAuth";
import { useFieldData } from "./hooks/useFieldData";
import { useFieldWeather } from "./hooks/useFieldWeather";
import { useFieldInsights } from "./hooks/useFieldInsights";
import { useFieldOperations } from "./hooks/useFieldOperations";
import { useFieldAgronomy } from "./hooks/useFieldAgronomy";
import { useToast } from "./hooks/useToast";
import { Header } from "./components/Header";
import { SidebarLeft } from "./components/SidebarLeft";
import { StatusBox } from "./components/StatusBox";
import { FieldForm } from "./components/FieldForm";
import { FieldGrid } from "./components/FieldGrid";
import { FieldWorkspace } from "./components/FieldWorkspace";
import { ProfilePage } from "./components/ProfilePage";
import { LogOperationModal } from "./components/LogOperationModal";
import { Pagination } from "./components/Pagination";
import { ToastContainer } from "./components/ToastContainer";
import { ConfirmDialog } from "./components/ConfirmDialog";
import OfflineBanner from "./components/OfflineBanner";
import AuthScreen from "./components/AuthScreen";
import type { HealthStatus, Field } from "./lib/types";

const AdminPanel = lazy(() => import("./components/AdminPanel"));

export default function App() {
  const auth = useAuth();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  // Confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const confirmResolveRef = useRef<(value: boolean) => void>(() => {});

  const showConfirm = useCallback(
    (message: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setConfirmMessage(message);
        setConfirmOpen(true);
        confirmResolveRef.current = resolve;
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    setConfirmOpen(false);
    confirmResolveRef.current(true);
  }, []);

  const handleCancelConfirm = useCallback(() => {
    setConfirmOpen(false);
    confirmResolveRef.current(false);
  }, []);

  const fieldData = useFieldData({
    token: auth.token,
    userId: auth.user?.id,
    logout: auth.logout,
    confirm: showConfirm,
    toast: addToast,
  });
  const fieldWeather = useFieldWeather({ token: auth.token });
  const fieldInsights = useFieldInsights({ token: auth.token });
  const fieldOperations = useFieldOperations({
    token: auth.token,
    logout: auth.logout,
    confirm: showConfirm,
    toast: addToast,
  });
  const fieldAgronomy = useFieldAgronomy({ token: auth.token, toast: addToast });

  // Health check on mount + when token changes
  useEffect(() => {
    if (!auth.token) return;
    fetch("/api/health")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setHealth)
      .catch(() => setHealth({ status: "error", db: "offline" }));
  }, [auth.token]);

  const handleOpenLogModal = useCallback(
    (field: Field, defaultType?: string, prefillMetadata?: Record<string, any>) => {
      fieldOperations.setSelectedFieldForLog(field);
      fieldOperations.setIsLogModalOpen(true);
      if (defaultType) {
        fieldOperations.setLogForm((prev) => ({ ...prev, type: defaultType }));
      }
      if (prefillMetadata) {
        fieldOperations.setMetadataPayload(prefillMetadata);
      }
    },
    [fieldOperations]
  );

  // Auth guard
  if (!auth.token) {
    return <AuthScreen onLoginSuccess={(newToken, newUser) => auth.login(newToken, newUser)} />;
  }

  // Loading screen
  if (fieldData.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-3 border-slate-700 border-t-emerald-400 rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm tracking-wide">Loading Mizan Platform...</p>
        </div>
      </div>
    );
  }

  const showPagination =
    fieldData.activeTab !== "knowledge" &&
    !fieldData.selectedFieldId &&
    ((fieldData.activeTab === "fields" && fieldData.fields.length > 0) ||
      fieldData.currentPage > 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pb-20">
      <OfflineBanner />
      
      {/* Facebook-style Top Header */}
      <Header
        user={auth.user}
        health={health}
        onLogout={auth.logout}
        activeTab={fieldData.activeTab}
        onTabChange={fieldData.setActiveTab}
        searchQuery={fieldData.searchQuery}
        onSearchChange={fieldData.setSearchQuery}
      />

      {/* Main Page: Facebook Three-Column Layout Grid */}
      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* COLUMN 1: Left Sidebar (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <SidebarLeft
              user={auth.user}
              activeTab={fieldData.activeTab}
              setActiveTab={fieldData.setActiveTab}
              fieldsCount={fieldData.fields.length}
              onLogout={auth.logout}
              selectedFieldId={fieldData.selectedFieldId}
              setSelectedFieldId={fieldData.setSelectedFieldId}
            />
          </div>

          {/* COLUMN 2 & 3: Main center workspace */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ========== FIELDS TAB ========== */}
            {fieldData.activeTab === "fields" && (
              <div className="space-y-6 animate-in fade-in">
                {fieldData.selectedFieldId ? (
                  <FieldWorkspace
                    field={fieldData.fields.find((f) => f.id === fieldData.selectedFieldId) || fieldData.fields[0]}
                    farms={fieldData.farms}
                    weatherData={fieldWeather.weatherData[fieldData.selectedFieldId]}
                    insightsData={fieldInsights.insightsData[fieldData.selectedFieldId]}
                    operationsData={fieldOperations.operationsData[fieldData.selectedFieldId]}
                    agronomyData={fieldAgronomy.agronomyData[fieldData.selectedFieldId]}
                    agronomyForm={fieldAgronomy.agronomyForm}
                    onAgronomyFormChange={fieldAgronomy.setAgronomyForm}
                    loadingWeather={fieldWeather.loadingWeather[fieldData.selectedFieldId] || false}
                    loadingInsights={fieldInsights.loadingInsights[fieldData.selectedFieldId] || false}
                    loadingOperations={fieldOperations.loadingOperations[fieldData.selectedFieldId] || false}
                    loadingAgronomy={fieldAgronomy.loadingAgronomy[fieldData.selectedFieldId] || false}
                    onFetchWeather={fieldWeather.fetchWeather}
                    onFetchInsights={fieldInsights.fetchInsights}
                    onFetchOperations={fieldOperations.fetchOperations}
                    onFetchAgronomy={fieldAgronomy.fetchAgronomy}
                    onLogOperation={handleOpenLogModal}
                    onLogOperationDirectly={fieldOperations.logOperationDirectly}
                    onDeleteOperation={fieldOperations.handleDeleteOperation}
                    onSaveAgronomy={fieldAgronomy.saveAgronomySection}
                    onClose={() => fieldData.setSelectedFieldId(null)}
                  />
                ) : (
                  <>
                    {/* Facebook-style Status Box */}
                    <StatusBox
                      fields={fieldData.fields}
                      onSubmitLog={fieldOperations.logOperationDirectly}
                      onToast={addToast}
                    />

                    {/* Main feed of fields */}
                    <FieldGrid
                      fields={fieldData.fields}
                      farms={fieldData.farms}
                      weatherData={fieldWeather.weatherData}
                      onFetchWeather={fieldWeather.fetchWeather}
                      onSelectField={fieldData.setSelectedFieldId}
                      onDeleteField={fieldData.handleDeleteField}
                      debouncedSearchQuery={fieldData.debouncedSearchQuery}
                    />
                  </>
                )}
              </div>
            )}

            {/* ========== CREATE FIELD TAB ========== */}
            {fieldData.activeTab === "create-field" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    ➕ Créer une nouvelle parcelle (إضافة حقل جديد)
                  </h2>
                  <button
                    type="button"
                    onClick={() => fieldData.setActiveTab("fields")}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Retour
                  </button>
                </div>
                <FieldForm
                  newField={fieldData.newField}
                  onFieldChange={fieldData.setNewField}
                  farms={fieldData.farms}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await fieldData.handleCreateField(e);
                    fieldData.setActiveTab("fields");
                  }}
                  isSubmitting={fieldData.isSubmitting}
                  showOptionalSoilInput={fieldAgronomy.showOptionalSoilInput}
                  onToggleSoil={() => fieldAgronomy.setShowOptionalSoilInput(!fieldAgronomy.showOptionalSoilInput)}
                  token={auth.token}
                />
              </div>
            )}

            {/* ========== PROFILE TAB ========== */}
            {fieldData.activeTab === "profile" && (
              <ProfilePage
                user={auth.user}
                farms={fieldData.farms}
                fields={fieldData.fields}
                operationsData={fieldOperations.operationsData}
                onToast={addToast}
              />
            )}

            {/* ========== KNOWLEDGE BASE TAB ========== */}
            {fieldData.activeTab === "knowledge" && (
              auth.user?.role === "DEVELOPER" ? (
                <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading Knowledge Base...</div>}>
                  <AdminPanel token={auth.token || ""} />
                </Suspense>
              ) : (
                <div className="text-center py-20 bg-slate-900/60 border border-white/5 rounded-3xl p-8 max-w-md mx-auto space-y-4 shadow-xl">
                  <span className="text-4xl">🚫</span>
                  <h3 className="text-lg font-bold text-rose-500">Access Denied (حظر: للمطورين فقط)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cette section est réservée exclusivement aux développeurs pour la maintenance de l'ontologie Mizan.
                  </p>
                  <button
                    onClick={() => fieldData.setActiveTab("fields")}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl transition-all active:scale-[0.98] shadow-md"
                  >
                    Retour (العودة للرئيسية)
                  </button>
                </div>
              )
            )}

            {/* ========== PAGINATION ========== */}
            {showPagination && (
              <Pagination currentPage={fieldData.currentPage} totalPages={fieldData.totalPages} onPageChange={fieldData.setCurrentPage} />
            )}
          </div>
        </div>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="fixed bottom-0 w-full border-t border-white/5 py-4 bg-slate-950/80 backdrop-blur-sm text-center text-[10px] uppercase tracking-widest text-slate-600 z-[100]" role="contentinfo">
        Mizan AgTech &middot; Plateforme Spécialisée Oléiculture &middot; 12 Variétés d&apos;Olivier
      </footer>

      {/* ========== LOG ACTION MODAL ========== */}
      <LogOperationModal
        isOpen={fieldOperations.isLogModalOpen}
        onClose={() => fieldOperations.setIsLogModalOpen(false)}
        onSubmit={fieldOperations.handleLogOperation}
        field={fieldOperations.selectedFieldForLog}
        logForm={fieldOperations.logForm}
        onLogFormChange={fieldOperations.setLogForm}
        dynamicFields={fieldOperations.dynamicFields}
        isFetchingFields={fieldOperations.isFetchingFields}
        metadataPayload={fieldOperations.metadataPayload}
        onMetadataChange={fieldOperations.setMetadataPayload}
        isLogging={fieldOperations.isLogging}
      />

      {/* ========== CONFIRM DIALOG ========== */}
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Confirm Action"
        message={confirmMessage}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirm}
        variant="danger"
      />

      {/* ========== TOAST NOTIFICATIONS ========== */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
