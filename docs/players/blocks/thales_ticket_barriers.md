---
block_ids:
- jsblock:thales_ticket_barrier_entrance
- jsblock:thales_ticket_barrier_exit
- jsblock:thales_ticket_barrier_bare
since: 1.0.6
image: JCM_thales_ticket_barriers.png
item_group: JCM Blocks
creator: AozoraSky
assets_creator: Unown A
transparent: true
light_level: 0
---

**Thales Ticket Barriers** is a series of ticket barriers in Joban Client Mod, replicating a variant of Ticket Barriers manufactured by Thales in Hong Kong.  
They function identically to the Ticket Barriers in the MTR Mod.

## Usage
### Thales Ticket Barrier (Bare)
By placing an MTR fence next to the Thales Ticket Barrier (Bare) variant, the barrier will automatically connect to the fence with a shorter variants.

![An example of an MTR fence attaching to a Thales Ticket Barrier (Bare variant)](./img/JCM_Thales_Ticket_Barrier_with_MTR_Fence.png)

## Crafting Recipe
### Ticket Barrier (Entrance)
{{Crafting 3x3|Minecraft Iron_ingot.png|Minecraft Iron_ingot.png|4=Minecraft Iron_ingot.png|5=Minecraft Redstone.png|6=Minecraft Iron_ingot.png|7=Minecraft Iron_ingot.png|8=Minecraft Redstone.png|9=Minecraft Iron_ingot.png|res=JCM Item Ticket barrier 1 entrance.png|Cres=2}}

### Ticket Barrier (Exit)
{{Crafting 3x3|JCM Item Ticket barrier 1 entrance.png|res=JCM Item Ticket barrier 1 exit.png}}

### Ticket Barrier (Bare)
{{Crafting 3x3||Minecraft Iron_ingot.png|4=|5=Minecraft Iron_ingot.png|6=Minecraft Iron_ingot.png|7=|8=Minecraft Iron_ingot.png|9=Minecraft Iron_ingot.png|res=JCM Item Ticket barrier 1 bare.png|Cres=2}}

## Block states
### Thales Ticket Barrier (Entrance / Exit)
| facing | open               |
|:-------|:-------------------|
| north  | closed             |
| east   | open               |
| south  | open_concessionary |
| west   |                    |

### Thales Ticket Barrier (Bare)
| facing | type | flipped |
|:-------|:-----|:--------|
| north  | 0    | true    |
| east   | 1    | false   |
| south  | 2    |         |
| west   | 3    |         |
|        | 4    |         |
|        | 5    |         |
|        | 6    |         |
|        | 7    |         |
|        | 8    |         |
|        | 9    |         |
|        | 10   |         |

### History
| Version | Changes Made                                                  |
|:--------|:--------------------------------------------------------------|
| v1.0.6  | Added Thales Ticket Barrier                                   |
| v1.1.5  | Improved Thales Ticket Barrier Block Model                    |
| v1.1.6  | Make Thales Ticket Barrier (Bare) attachable to MTR Fence     |
| v1.2.2  | Make fence stay as is if a block is next to the barrier fence |
| v2.0.0  | Rename `jsblock:ticket_barrier_1_entrance` to `jsblock:thales_ticket_barrier_entrance`<br>Rename `jsblock:ticket_barrier_1_exit` to `jsblock:thales_ticket_barrier_exit`<br>Rename `jsblock:ticket_barrier_1_bare` to `jsblock:thales_ticket_barrier_bare` |
