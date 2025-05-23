# Dark Mode Color Reference

All dark mode colors are centralized in `src/styles/globals.css`. This file serves as a quick reference for all available color variables.

## 📋 Color Categories

### **Brand Colors**
- `--color-primary`: #cf6742 (Brand orange)
- `--color-secondary`: #0077b6 (Brand blue)
- `--color-text`: #3a7d44 (Brand green)
- `--color-primary-hover`: #a14d2f (Darker orange)
- `--color-very-light-hover`: Adaptive based on theme

### **Basic Layout Colors**
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--bg-primary` | #F9FAF5 | #0f172a |
| `--bg-secondary` | #ffffff | #1e293b |
| `--bg-tertiary` | #f8f9fa | #1e293b |
| `--text-primary` | #111111 | #f8fafc |
| `--text-secondary` | #6b7280 | #94a3b8 |
| `--text-muted` | #9ca3af | #64748b |
| `--border-color` | #000000 | #334155 |
| `--border-light` | #e5e7eb | #334155 |
| `--card-bg` | #ffffff | #1e293b |
| `--card-border` | #e5e7eb | #334155 |

### **Segment Display Colors**
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--segment-bg` | #ffffff | #1e293b |
| `--segment-translation-bg` | #fefefe | #1e293b |
| `--segment-arabic-bg` | #f9f9f9 | #0f172a |
| `--segment-border` | #eee | #334155 |
| `--segment-nav-bg` | #00632e | #065f46 |
| `--segment-nav-text` | #ffffff | #ecfdf5 |

### **Vocabulary Colors**
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--vocab-bg` | #FFFDE7 | #1e293b |
| `--vocab-border` | #ECAE2E | #ECAE2E |
| `--vocab-title-color` | #d89a1e | #fbbf24 |
| `--vocab-text-color` | #2c3e50 | #f8fafc |
| `--vocab-translation-color` | #434e4f | #cbd5e1 |
| `--vocab-item-border` | #d6eaf8 | #334155 |

### **Slider Colors**
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--slider-track-bg` | #e0e0e0 | #334155 |
| `--slider-range-bg` | #f0c419 | #fbbf24 |
| `--slider-thumb-bg` | #ffffff | #1e293b |
| `--slider-thumb-border` | #f0c419 | #fbbf24 |
| `--slider-focus-ring` | rgba(240, 196, 25, 0.3) | rgba(251, 191, 36, 0.3) |

### **Progress Bar Colors**
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--progress-track-bg` | #e0e0e0 | #334155 |
| `--progress-bar-bg` | #00632E | #10b981 |
| `--progress-text-color` | #2e2e2e | #f8fafc |
| `--progress-time-color` | #555 | #94a3b8 |

### **Button Colors**
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--button-nav-bg` | #008000 | #10b981 |
| `--button-nav-hover-bg` | #1aa073 | #059669 |
| `--button-disabled-bg` | #95a5a6 | #64748b |

### **Message Colors**
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--error-color` | #e74c3c | #ef4444 |
| `--error-bg` | #f2dede | #1e293b |
| `--error-border` | #ebccd1 | #334155 |
| `--success-color` | #27ae60 | #10b981 |
| `--warning-color` | #f39c12 | #f59e0b |

## 🎨 How to Use

1. **Add new colors**: Add them to `src/styles/globals.css` in both the `:root` and `body.dark-mode` sections
2. **Use in components**: Reference using `var(--variable-name)` in any CSS file
3. **Maintain consistency**: Always use variables instead of hardcoded colors

## 🔧 Quick Updates

To change the color scheme:
1. Update the values in `src/styles/globals.css`
2. The changes will automatically apply to all components
3. No need to modify individual component CSS files

## 📱 Components Using These Colors

- **Header**: Language switcher and dark mode toggle
- **Transcription Page**: Video player, segments, vocabulary, slider, progress bars
- **Footer**: Links and text
- **All Cards**: Backgrounds and borders
- **All Buttons**: Navigation and interaction buttons
- **All Text**: Primary, secondary, and muted text styles 