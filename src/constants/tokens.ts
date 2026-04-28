export const tokens = {
    colors: {
        bgScreen: '#F5F8FD',
        bgCard: '#FFFFFF',
        bgPill: '#EFF2F7',
        bgSkeleton: '#EEEFF1',

        textPrimary: '#111416',
        textSecondary: '#57626F',
        textMuted: '#68727D',

        border: '#E8ECEF',

        brandPrimary: '#6115CD',
        white: '#FFFFFF',

        overlayDark: 'rgba(0,0,0,0.5)',
    },
    space: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
        xxxl: 40,
    },
    radii: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 22,
        pill: 999,
    },
    typography: {
        h4: {
            fontSize: 18,
            lineHeight: 26,
        },
        body: {
            fontSize: 15,
            lineHeight: 20,
        },
        caption: {
            fontSize: 13,
            lineHeight: 18,
        },
    }
} as const;