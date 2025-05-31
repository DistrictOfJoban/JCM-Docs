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
recipes:
- jsblock:thales_ticket_barrier_entrance
- jsblock:thales_ticket_barrier_exit
- jsblock:thales_ticket_barrier_bare
---

**Thales Ticket Barriers** is a series of ticket barriers in Joban Client Mod, modelled after a variant of Ticket Barriers manufactured by the **Thales Group**.

## Usage
### Thales Ticket Barrier (Entrance/Exit)
You can walk through the ticket barrier in a defined station area to pass through the gates.

They function identically to the Ticket Barriers in the MTR mod.

### Thales Ticket Barrier (Bare)
By placing an MTR fence next to the Thales Ticket Barrier (Bare) variant, the barrier will automatically connect to the fence with a shorter variants.

![An example of an MTR fence attaching to a Thales Ticket Barrier (Bare variant)](./img/JCM_Thales_Ticket_Barrier_with_MTR_Fence.png)

## Crafting Recipe
### Ticket Barrier (Entrance)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Thales_ticket_barrier_entrance.png">
    </div>
</div>

### Ticket Barrier (Exit)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Thales_ticket_barrier_entrance.png"></div>
        <div></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result">
        <img src="../crafting/JCM_Item_Thales_ticket_barrier_exit.png">
    </div>
</div>

### Ticket Barrier (Bare)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 3 -->
        <div></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Thales_ticket_barrier_bare.png">
    </div>
</div>

## Block states
### Thales Ticket Barrier (Entrance / Exit)
| facing | open               |
|:-------|:-------------------|
| north  | closed             |
| east   | pending            |
| south  | open               |
| west   | open_concessionary |

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
