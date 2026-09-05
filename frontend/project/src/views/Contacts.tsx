import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, MoreHorizontal, Eye, Pencil, Trash2, Plus, Filter, ArrowLeft, ArrowRight, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { contacts as initialContacts, companies } from '@/data/mockData';
import type { Contact, Status } from '@/types';
import { StatusBadge, Avatar } from '@/components/Badges';
import { ContactProfile } from '@/components/ContactProfile';
import { classNames } from '@/lib/utils';

type SortKey = 'name' | 'company' | 'role' | 'status' | 'lastContact';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 8;

export function Contacts() {
  const [contacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(0);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = useMemo(() => {
    let result = contacts.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'company') cmp = a.company.localeCompare(b.company);
      else if (sortKey === 'role') cmp = a.role.localeCompare(b.role);
      else if (sortKey === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortKey === 'lastContact') cmp = a.lastContact.localeCompare(b.lastContact);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [contacts, search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ChevronDown className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />;
    return sortDir === 'asc' ? <ChevronUp className="h-3.5 w-3.5 text-blue-500" /> : <ChevronDown className="h-3.5 w-3.5 text-blue-500" />;
  };

  return (
    <>
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                placeholder="Search contacts..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {(['All', 'Active', 'Lead', 'Inactive'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setPage(0); }}
                  className={classNames(
                    'rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                    statusFilter === s
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md">
            <Plus className="h-4 w-4" /> Add Contact
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => toggleSort('name')} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Name <SortIcon column="name" />
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 text-left md:table-cell">
                    <button onClick={() => toggleSort('company')} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Company <SortIcon column="company" />
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 text-left lg:table-cell">
                    <button onClick={() => toggleSort('role')} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Role <SortIcon column="role" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => toggleSort('status')} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Status <SortIcon column="status" />
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 text-left xl:table-cell">
                    <button onClick={() => toggleSort('lastContact')} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Last Contact <SortIcon column="lastContact" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {pageData.map((contact) => (
                  <tr key={contact.id} className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3">
                      <button onClick={() => setSelectedContact(contact)} className="flex items-center gap-3 text-left">
                        <Avatar initials={contact.initials} color={contact.avatarColor} />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">{contact.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{contact.email}</p>
                        </div>
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <p className="text-sm text-slate-700 dark:text-slate-300">{contact.company}</p>
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <p className="text-sm text-slate-700 dark:text-slate-300">{contact.role}</p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={contact.status} />
                    </td>
                    <td className="hidden px-4 py-3 xl:table-cell">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{contact.lastContact}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="relative inline-block" ref={openMenuId === contact.id ? menuRef : undefined}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === contact.id ? null : contact.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                        >
                          <MoreHorizontal className="h-4.5 w-4.5" />
                        </button>
                        {openMenuId === contact.id && (
                          <div className="absolute right-0 mt-1 w-44 origin-top-right rounded-lg border border-slate-200 bg-white py-1 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800">
                            <button onClick={() => { setSelectedContact(contact); setOpenMenuId(null); }} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
                              <Eye className="h-4 w-4" /> View Profile
                            </button>
                            <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
                              <Pencil className="h-4 w-4" /> Edit
                            </button>
                            <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                              <Trash2 className="h-4 w-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-medium text-slate-700 dark:text-slate-300">{page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, filtered.length)}</span> of{' '}
              <span className="font-medium text-slate-700 dark:text-slate-300">{filtered.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={classNames(
                    'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors',
                    page === i
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Profile Drawer */}
      {selectedContact && (
        <ContactProfile contact={selectedContact} onClose={() => setSelectedContact(null)} />
      )}
    </>
  );
}
