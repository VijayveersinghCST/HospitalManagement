import { BedItem, BedStatus, RoomItem, WardCategory, WardItem } from "./WardRoomsAndBeds";

interface RoomSeed {
    roomNumber: string;
    roomType: string;
    bedStatuses: BedStatus[];
}

interface WardSeed {
    id: string;
    name: string;
    location: string;
    category: WardCategory;
    rooms: RoomSeed[];
}

const WARD_SEEDS: WardSeed[] = [
    {
        id: "W-1",
        name: "General Ward",
        location: "Block A, 2nd Floor",
        category: "General",
        rooms: [
            { roomNumber: "101", roomType: "General Ward", bedStatuses: ["Occupied", "Available", "Available", "Available"] },
            { roomNumber: "102", roomType: "General Ward", bedStatuses: ["Occupied", "Occupied", "Available", "Available"] },
            { roomNumber: "103", roomType: "General Ward", bedStatuses: ["Available", "Available", "Available", "Available"] },
        ],
    },
    {
        id: "W-2",
        name: "ICU",
        location: "Block B, 1st Floor",
        category: "ICU",
        rooms: [
            { roomNumber: "201", roomType: "ICU Suite", bedStatuses: ["Occupied", "Occupied", "Occupied", "Available", "Available"] },
            { roomNumber: "202", roomType: "ICU Suite", bedStatuses: ["Occupied", "Occupied", "Occupied", "Occupied", "Available"] },
        ],
    },
    {
        id: "W-3",
        name: "Emergency (ER)",
        location: "Ground Floor",
        category: "Emergency",
        rooms: [
            { roomNumber: "301", roomType: "Semi-Private", bedStatuses: ["Occupied", "Occupied", "Occupied", "Occupied", "Occupied", "Available"] },
            { roomNumber: "302", roomType: "Semi-Private", bedStatuses: ["Occupied", "Occupied", "Occupied", "Maintenance", "Maintenance", "Occupied"] },
        ],
    },
    {
        id: "W-4",
        name: "Private Wing A",
        location: "Block C, 3rd Floor",
        category: "Private",
        rooms: [
            { roomNumber: "401", roomType: "Single Private", bedStatuses: ["Occupied", "Available"] },
            { roomNumber: "402", roomType: "Single Private", bedStatuses: ["Available", "Available"] },
            { roomNumber: "403", roomType: "Single Private", bedStatuses: ["Occupied", "Maintenance"] },
        ],
    },
    {
        id: "W-5",
        name: "Maternity Ward",
        location: "Block D, 1st Floor",
        category: "Maternity",
        rooms: [
            { roomNumber: "501", roomType: "General Ward", bedStatuses: ["Occupied", "Occupied", "Available", "Available"] },
            { roomNumber: "502", roomType: "General Ward", bedStatuses: ["Reserved", "Available", "Available", "Occupied"] },
        ],
    },
];

const PATIENT_NAMES = [
    "Sarah Jenkins", "Rajesh Kumar", "Anjali Sharma", "Vikram Singh", "Meera Patel",
    "Arjun Verma", "Priya Nair", "Karan Malhotra", "Sunita Rao", "Aditya Joshi",
    "Neha Gupta", "Rohan Kapoor", "Divya Menon", "Suresh Iyer", "Pooja Desai",
];

function buildWardRoomsAndBeds() {
    const wards: WardItem[] = [];
    const rooms: RoomItem[] = [];
    const beds: BedItem[] = [];
    let patientIndex = 0;

    WARD_SEEDS.forEach((wardSeed) => {
        let wardTotalBeds = 0;
        let wardAvailableBeds = 0;

        wardSeed.rooms.forEach((roomSeed, roomIdx) => {
            const roomId = `${wardSeed.id}-R${roomIdx + 1}`;
            const totalBeds = roomSeed.bedStatuses.length;
            const availableBeds = roomSeed.bedStatuses.filter((s) => s === "Available").length;

            rooms.push({
                id: roomId,
                roomNumber: roomSeed.roomNumber,
                roomType: roomSeed.roomType,
                wardId: wardSeed.id,
                wardName: wardSeed.name,
                totalBeds,
                availableBeds,
            });

            roomSeed.bedStatuses.forEach((status, bedIdx) => {
                beds.push({
                    id: `${roomId}-B${bedIdx + 1}`,
                    bedNumber: `${roomSeed.roomNumber}-${bedIdx + 1}`,
                    status,
                    patientName: status === "Occupied" ? PATIENT_NAMES[patientIndex++ % PATIENT_NAMES.length] : undefined,
                    roomId,
                    roomNumber: roomSeed.roomNumber,
                    wardId: wardSeed.id,
                    wardName: wardSeed.name,
                });
            });

            wardTotalBeds += totalBeds;
            wardAvailableBeds += availableBeds;
        });

        wards.push({
            id: wardSeed.id,
            name: wardSeed.name,
            location: wardSeed.location,
            category: wardSeed.category,
            totalRooms: wardSeed.rooms.length,
            totalBeds: wardTotalBeds,
            availableBeds: wardAvailableBeds,
            occupancyPercent: Math.round(((wardTotalBeds - wardAvailableBeds) / wardTotalBeds) * 100),
        });
    });

    return { wards, rooms, beds };
}

const { wards, rooms, beds } = buildWardRoomsAndBeds();

export const MOCK_WARDS: WardItem[] = wards;
export const MOCK_ROOMS: RoomItem[] = rooms;
export const MOCK_BEDS: BedItem[] = beds;
