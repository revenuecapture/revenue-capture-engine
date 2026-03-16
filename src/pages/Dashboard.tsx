import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDashboard } from '@/hooks/useDashboard'
import { useConversionCelebration } from '@/hooks/useConversionCelebration'
import { OverviewTab } from '@/components/dashboard/OverviewTab'
import { ProspectTracker } from '@/components/dashboard/ProspectTracker'
import { CadenceTab } from '@/components/dashboard/CadenceTab'
import { RevenueTab } from '@/components/dashboard/RevenueTab'
import { LaunchDateModal } from '@/components/dashboard/LaunchDateModal'
import { Prospect } from '@/types/dashboard'

export default function Dashboard() {
  const {
    prospects, cadenceStates, dashState, loading,
    stats, projections, projectedMRR, actualMRR,
    currentWeekAuto, setLaunchDate,
    addProspect, deleteProspect, updateProspect, cycleStatus, cycleCadence,
    scheduleStateSave, prospectCurrentDay, prospectsInWeek, getWeekBounds,
  } = useDashboard()

  const { celebrate } = useConversionCelebration()

  const handleCycleStatus = async (id: string) => {
    const result = await cycleStatus(id)
    if (result?.next === 'converted') {
      celebrate(result.prospect.company, result.prospect.deal_value || 999)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-green flex items-center justify-center flex-col gap-4">
        <img src="/Logo.svg" alt="revCap" className="h-12 w-auto object-contain opacity-50 animate-pulse" />
        <p className="font-heading text-dutch-white/50 text-sm uppercase tracking-widest animate-pulse">
          Loading dashboard
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-green text-dutch-white relative overflow-x-hidden">

      {/* Ambient orbs */}
      <div className="orb orb-a pointer-events-none fixed w-[600px] h-[600px] -top-40 -right-40 opacity-20"
        style={{ background: 'radial-gradient(circle, #095256 0%, transparent 70%)' }} />
      <div className="orb orb-b pointer-events-none fixed w-[500px] h-[500px] bottom-0 -left-40 opacity-15"
        style={{ background: 'radial-gradient(circle, #732f37 0%, transparent 70%)' }} />

      {/* Launch date modal — shown until a date is set */}
      {!dashState.launch_start && (
        <LaunchDateModal onConfirm={setLaunchDate} />
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="mt-4 rounded-2xl border border-dutch-white/10 backdrop-blur-md bg-midnight-green/60 px-6 py-3 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <a href="/" className="group">
                <img src="/Logo.svg" alt="revCap" className="h-9 w-auto object-contain group-hover:opacity-75 transition-opacity" />
              </a>
              <span className="hidden sm:block text-dutch-white/20 text-sm">|</span>
              <span className="hidden sm:block text-dutch-white/45 text-xs uppercase tracking-widest font-body">
                Soft Launch Dashboard
              </span>
            </div>
            <div className="flex items-center gap-3">
              {dashState.launch_start && (
                <div className="text-dutch-white/35 text-xs font-body hidden sm:block">
                  Launch: {new Date(dashState.launch_start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              )}
              <div className="px-3 py-1.5 rounded-lg text-dutch-white/40 text-xs font-heading font-bold uppercase tracking-wide"
                style={{ background: 'rgba(239,223,187,0.05)', border: '1px solid rgba(239,223,187,0.08)' }}>
                30-day soft launch
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-8 py-8">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8 bg-transparent border-b border-dutch-white/10 rounded-none p-0 h-auto w-full justify-start gap-0">
            {[
              { value: 'overview', label: 'Overview' },
              { value: 'tracker',  label: 'Prospect Tracker' },
              { value: 'cadence',  label: 'Cadence' },
              { value: 'revenue',  label: 'Revenue' },
            ].map(({ value, label }) => (
              <TabsTrigger key={value} value={value}
                className="font-heading text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-none border-b-2 border-transparent text-dutch-white/40 hover:text-dutch-white/70 transition-colors data-[state=active]:text-dutch-white data-[state=active]:border-wine data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab prospects={prospects} stats={stats} projections={projections}
              projectedMRR={projectedMRR} actualMRR={actualMRR} dashState={dashState}
              currentWeekAuto={currentWeekAuto}
              prospectsInWeek={prospectsInWeek} getWeekBounds={getWeekBounds}
              onRateChange={(field, value) => scheduleStateSave({ [field]: value })}
              onNotesChange={value => scheduleStateSave({ session_notes: value })}
              prospectCurrentDay={prospectCurrentDay} />
          </TabsContent>
          <TabsContent value="tracker">
            <ProspectTracker prospects={prospects} prospectCurrentDay={prospectCurrentDay}
              onAdd={addProspect} onDelete={deleteProspect}
              onUpdate={(id, field, value) => updateProspect(id, field as keyof Prospect, value)}
              onCycleStatus={handleCycleStatus} />
          </TabsContent>
          <TabsContent value="cadence">
            <CadenceTab prospects={prospects} cadenceStates={cadenceStates} onCycle={cycleCadence} />
          </TabsContent>
          <TabsContent value="revenue">
            <RevenueTab prospects={prospects} projections={projections}
              projectedMRR={projectedMRR} actualMRR={actualMRR} stats={stats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
