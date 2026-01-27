---
name: scallywag
description: Kizsl's mega skill combining 3D games, algorithmic art, brand guidelines, canvas design, frontend design, game art, game development, Godot patterns, Remotion video, theme factory, and web artifacts. Use for ANY creative or development task including games, art, design, frontend, video, and web applications.
---

# Scallywag - The Mega Skill

This skill combines expertise in game development, visual design, frontend development, video creation, and web applications. Use it for any creative or technical task.

---

# PART 1: GAME DEVELOPMENT

## 3D Game Development

### Rendering Pipeline

```
1. Vertex Processing → Transform geometry
2. Rasterization → Convert to pixels
3. Fragment Processing → Color pixels
4. Output → To screen
```

### Optimization Techniques

| Technique | Purpose |
|-----------|---------|
| **Frustum culling** | Don't render off-screen |
| **Occlusion culling** | Don't render hidden |
| **LOD** | Less detail at distance |
| **Batching** | Combine draw calls |

### Shader Types

| Type | Purpose |
|------|---------|
| **Vertex** | Position, normals |
| **Fragment/Pixel** | Color, lighting |
| **Compute** | General computation |

### 3D Physics - Collision Shapes

| Shape | Use Case |
|-------|----------|
| **Box** | Buildings, crates |
| **Sphere** | Balls, quick checks |
| **Capsule** | Characters |
| **Mesh** | Terrain (expensive) |

### Camera Types

| Type | Use |
|------|-----|
| **Third-person** | Action, adventure |
| **First-person** | Immersive, FPS |
| **Isometric** | Strategy, RPG |
| **Orbital** | Inspection, editors |

### Lighting

| Type | Use |
|------|-----|
| **Directional** | Sun, moon |
| **Point** | Lamps, torches |
| **Spot** | Flashlight, stage |
| **Ambient** | Base illumination |

## Game Developer Checklist

- 60 FPS stable maintained
- Load time < 3 seconds
- Memory usage optimized
- Network latency < 100ms
- Crash rate < 0.1%

### Game Architecture Patterns

- Entity component systems
- Scene management
- Resource loading
- State machines
- Event systems
- Save systems
- Input handling
- Object pooling

### Engine Expertise

- Unity C# development
- Unreal C++ programming
- Godot GDScript
- Custom engine development
- WebGL optimization
- Mobile optimization

## Game Art Principles

### Art Style Selection

| Style | Production Speed | Best For |
|-------|------------------|----------|
| **Pixel Art** | Medium | Indie, retro |
| **Vector/Flat** | Fast | Mobile, casual |
| **Hand-painted** | Slow | Fantasy, stylized |
| **PBR 3D** | Slow | Realistic games |
| **Low-poly** | Fast | Indie 3D |
| **Cel-shaded** | Medium | Anime, cartoon |

### Animation Principles for Games

| Principle | Game Application |
|-----------|------------------|
| **Squash & Stretch** | Jump arcs, impacts |
| **Anticipation** | Wind-up before attack |
| **Staging** | Clear silhouettes |
| **Follow-through** | Hair, capes after movement |
| **Timing** | Frame count = weight/speed |

---

# PART 2: GODOT GDSCRIPT PATTERNS

## Core GDScript Structure

```gdscript
class_name Player
extends CharacterBody2D

signal health_changed(new_health: int)
signal died

@export var speed: float = 200.0
@export var max_health: int = 100

@onready var sprite: Sprite2D = $Sprite2D
@onready var animation: AnimationPlayer = $AnimationPlayer

var _health: int

func _ready() -> void:
    _health = max_health

func _physics_process(delta: float) -> void:
    var direction := Input.get_vector("left", "right", "up", "down")
    velocity = direction * speed
    move_and_slide()
```

## State Machine Pattern

```gdscript
class_name StateMachine
extends Node

signal state_changed(from_state: StringName, to_state: StringName)

@export var initial_state: State
var current_state: State
var states: Dictionary = {}

func _ready() -> void:
    for child in get_children():
        if child is State:
            states[child.name] = child
            child.state_machine = self

func transition_to(state_name: StringName, msg: Dictionary = {}) -> void:
    var previous_state := current_state
    previous_state.exit()
    current_state = states[state_name]
    current_state.enter(msg)
    state_changed.emit(previous_state.name, current_state.name)
```

## Object Pooling Pattern

```gdscript
class_name ObjectPool
extends Node

@export var pooled_scene: PackedScene
@export var initial_size: int = 10

var _available: Array[Node] = []
var _in_use: Array[Node] = []

func get_instance() -> Node:
    var instance: Node
    if _available.is_empty():
        instance = pooled_scene.instantiate()
    else:
        instance = _available.pop_back()
    _in_use.append(instance)
    return instance
```

## Godot Best Practices

- **Use signals for decoupling**
- **Type everything** - Static typing catches errors
- **Use resources for data** - Separate data from logic
- **Pool frequently spawned objects**
- **Cache node references with @onready**

---

# PART 3: VISUAL DESIGN

## Algorithmic Art (p5.js)

Create generative art through:
- Computational processes, emergent behavior, mathematical beauty
- Seeded randomness, noise fields, organic systems
- Particles, flows, fields, forces
- Parametric variation and controlled chaos

### Seeded Randomness Pattern

```javascript
let seed = 12345;
randomSeed(seed);
noiseSeed(seed);
```

### Algorithmic Philosophy Examples

- **Organic Turbulence**: Chaos constrained by natural law
- **Quantum Harmonics**: Discrete entities with wave interference
- **Recursive Whispers**: Self-similarity across scales
- **Field Dynamics**: Invisible forces made visible
- **Stochastic Crystallization**: Random processes crystallizing into order

## Canvas Design Philosophy

Create visual art that is:
- 90% visual design, 10% essential text
- Museum or magazine quality
- Meticulously crafted with expert attention

### Design Elements

- Form, space, color, composition
- Images, graphics, shapes, patterns
- Minimal text as visual accent
- Repeating patterns and perfect shapes

## Brand Guidelines (Anthropic)

### Colors

- Dark: `#141413`
- Light: `#faf9f5`
- Orange: `#d97757`
- Blue: `#6a9bcc`
- Green: `#788c5d`

### Typography

- **Headings**: Poppins
- **Body Text**: Lora

---

# PART 4: FRONTEND DESIGN

## Design Principles

Create distinctive, production-grade interfaces that avoid generic "AI slop":

### Focus On

- **Typography**: Distinctive, characterful fonts (avoid Inter, Arial, Roboto)
- **Color & Theme**: Dominant colors with sharp accents, CSS variables
- **Motion**: Animations, micro-interactions, staggered reveals
- **Spatial Composition**: Asymmetry, overlap, grid-breaking, negative space
- **Visual Details**: Gradient meshes, noise textures, shadows, grain overlays

### Avoid

- Overused fonts (Inter, Roboto, Arial)
- Purple gradients on white backgrounds
- Predictable layouts
- Cookie-cutter patterns

### Design Thinking

Before coding:
- **Purpose**: What problem does this solve?
- **Tone**: Pick an extreme aesthetic (brutalist, maximalist, retro-futuristic, etc.)
- **Differentiation**: What makes this unforgettable?

---

# PART 5: THEME FACTORY

## Available Themes

1. **Ocean Depths** - Professional maritime
2. **Sunset Boulevard** - Warm sunset colors
3. **Forest Canopy** - Natural earth tones
4. **Modern Minimalist** - Clean grayscale
5. **Golden Hour** - Rich autumnal palette
6. **Arctic Frost** - Cool winter theme
7. **Desert Rose** - Soft dusty tones
8. **Tech Innovation** - Bold tech aesthetic
9. **Botanical Garden** - Fresh garden colors
10. **Midnight Galaxy** - Cosmic deep tones

---

# PART 6: WEB ARTIFACTS

## Stack

React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui

## Quick Start

```bash
bash scripts/init-artifact.sh <project-name>
cd <project-name>
# Develop your artifact
bash scripts/bundle-artifact.sh
```

Creates `bundle.html` - a self-contained artifact with everything inlined.

---

# PART 7: REMOTION VIDEO

## Core Concepts

- Compositions define video dimensions and duration
- Use `useCurrentFrame()` and `useVideoConfig()` hooks
- Sequence components for timing
- Interpolate for animations

## Key Features

- 3D content with Three.js
- Audio/video embedding and trimming
- Captions and transcription
- Lottie animations
- Text animations
- Scene transitions

---

# USAGE

This mega skill automatically applies when working on:

- **Games**: 3D rendering, physics, AI, multiplayer, Godot/Unity/Unreal
- **Art**: Generative algorithms, p5.js, canvas design, visual philosophy
- **Design**: Brand guidelines, themes, typography, color theory
- **Frontend**: React, web components, UI/UX, distinctive interfaces
- **Video**: Remotion, animations, compositions, effects
- **Web Apps**: Full-stack artifacts, shadcn/ui components

**Remember**: Create work that looks meticulously crafted, as if it took countless hours by someone at the absolute top of their field.
