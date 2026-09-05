import { useState } from 'react';
import { User, Bell, Shield, Palette, Building2, Mail, Globe, Moon, Sun, Check } from 'lucide-react';
import { classNames } from '@/lib/utils';

interface SettingsProps {
  dark: boolean;
  onToggleDark: () => void;
}

type Section = 'profile' | 'notifications' | 'appearance' | 'company' | 'security';

export function Settings({ dark, onToggleDark }: SettingsProps) {
  const [section, setSection] = useState<Section>('profile');
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [dealAlerts, setDealAlerts] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [saved, setSaved] = useState(false);

  const sections: { id: Section; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={classNames(
        'relative h-6 w-11 rounded-full transition-colors',
        checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
      )}
    >
      <span className={classNames(
        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
        checked ? 'translate-x-5' : 'translate-x-0.5'
      )} />
    </button>
  );

  const Input = ({ label, value, type = 'text' }: { label: string; value: string; type?: string }) => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Section nav */}
      <div className="lg:w-56 shrink-0">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={classNames(
                  'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  section === s.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                )}
              >
                <Icon className="h-4.5 w-4.5" /> {s.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          {section === 'profile' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Settings</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage your personal information</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white">
                  AM
                </div>
                <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  Change Avatar
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Full Name" value="Alex Morgan" />
                <Input label="Job Title" value="Sales Manager" />
                <Input label="Email Address" value="alex.morgan@nexuscrm.com" type="email" />
                <Input label="Phone Number" value="(555) 123-4567" />
                <Input label="Timezone" value="Pacific Time (PT)" />
                <Input label="Language" value="English (US)" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
                <textarea
                  defaultValue="Experienced sales manager with a passion for building strong client relationships and driving revenue growth."
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
                />
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Choose what alerts you receive</p>
              </div>

              <div className="space-y-1">
                {[
                  { label: 'Email Notifications', desc: 'Receive alerts via email', checked: emailNotif, onChange: () => setEmailNotif(!emailNotif) },
                  { label: 'Push Notifications', desc: 'Get real-time browser alerts', checked: pushNotif, onChange: () => setPushNotif(!pushNotif) },
                  { label: 'Weekly Report', desc: 'Summary of your sales activity every Monday', checked: weeklyReport, onChange: () => setWeeklyReport(!weeklyReport) },
                  { label: 'Deal Stage Alerts', desc: 'Notify when deals change stages', checked: dealAlerts, onChange: () => setDealAlerts(!dealAlerts) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-slate-100 py-3.5 last:border-0 dark:border-slate-800">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <Toggle checked={item.checked} onChange={item.onChange} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'appearance' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Appearance</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Customize how NexusCRM looks</p>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 py-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Toggle between light and dark theme</p>
                  </div>
                </div>
                <Toggle checked={dark} onChange={onToggleDark} />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Accent Color</p>
                <div className="flex gap-2.5">
                  {['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-cyan-500'].map((color, i) => (
                    <button
                      key={color}
                      className={classNames(
                        'flex h-10 w-10 items-center justify-center rounded-lg text-white',
                        color,
                        i === 0 && 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900'
                      )}
                    >
                      {i === 0 && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === 'company' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Company Settings</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage your organization details</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Company Name" value="NexusCRM Inc." />
                <Input label="Industry" value="Software / SaaS" />
                <Input label="Website" value="https://nexuscrm.com" />
                <Input label="Employees" value="50-200" />
                <Input label=" Headquarters" value="San Francisco, CA" />
                <Input label="Founded" value="2019" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Default Currency</label>
                  <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Fiscal Year Start</label>
                  <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20">
                    <option>January</option>
                    <option>April</option>
                    <option>July</option>
                    <option>October</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {section === 'security' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Keep your account secure</p>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 py-4 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security to your account</p>
                </div>
                <Toggle checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Change Password</h4>
                <Input label="Current Password" value="" type="password" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="New Password" value="" type="password" />
                  <Input label="Confirm New Password" value="" type="password" />
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-slate-400" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Sessions</p>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">1 active session · San Francisco, CA · Chrome on macOS</p>
              </div>
            </div>
          )}

          {/* Save bar */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <Check className="h-4 w-4" /> Changes saved
              </span>
            )}
            <button className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
