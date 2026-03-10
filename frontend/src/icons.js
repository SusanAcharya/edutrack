// ========================================
// OpenScholar — Lucide Icon Helpers
// ========================================

import {
    createIcons,
    // Navigation & UI
    Search, Menu, X, ChevronDown, ChevronRight, ArrowRight, ArrowUpRight, ExternalLink, Plus, Eye,
    // General
    Globe, Heart, Star, Sparkles, Shield, ShieldCheck, CheckCircle, XCircle, Clock, AlertTriangle,
    // User roles
    User, Users, GraduationCap, Building2, School, Wrench, UserPlus, UserCheck,
    // Finance
    DollarSign, Banknote, Wallet, CreditCard, TrendingUp, TrendingDown, PiggyBank, HandCoins,
    // Documents
    FileText, FileCheck, FilePlus, FileWarning, Paperclip, Upload, Download, Image,
    // Data & Charts
    BarChart3, PieChart, Activity, LayoutDashboard, FolderOpen, Layers, ListChecks,
    // Actions
    Send, Check, Ban, Trash2, Edit, MessageSquare, Bell, Copy,
    // Objects
    BookOpen, Shirt, UtensilsCrossed, Bus, Beaker, MapPin, Phone, Mail, Calendar,
    // Layout
    LayoutGrid, ArrowLeftRight, CircleDot
} from 'lucide';

// Call this after every DOM render to replace <i data-lucide="..."> with SVGs
export function refreshIcons() {
    createIcons({
        icons: {
            Search, Menu, X, ChevronDown, ChevronRight, ArrowRight, ArrowUpRight, ExternalLink, Plus, Eye,
            Globe, Heart, Star, Sparkles, Shield, ShieldCheck, CheckCircle, XCircle, Clock, AlertTriangle,
            User, Users, GraduationCap, Building2, School, Wrench, UserPlus, UserCheck,
            DollarSign, Banknote, Wallet, CreditCard, TrendingUp, TrendingDown, PiggyBank, HandCoins,
            FileText, FileCheck, FilePlus, FileWarning, Paperclip, Upload, Download, Image,
            BarChart3, PieChart, Activity, LayoutDashboard, FolderOpen, Layers, ListChecks,
            Send, Check, Ban, Trash2, Edit, MessageSquare, Bell, Copy,
            BookOpen, Shirt, UtensilsCrossed, Bus, Beaker, MapPin, Phone, Mail, Calendar,
            LayoutGrid, ArrowLeftRight, CircleDot
        }
    });
}

// Shorthand: returns an <i> tag string for a Lucide icon
export function icon(name, size = 18, cls = '') {
    return `<i data-lucide="${name}" class="lucide ${cls}" style="width:${size}px;height:${size}px;"></i>`;
}
