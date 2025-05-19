import { getObjectsComparator } from "./getObjectsComparator";

const comparator = getObjectsComparator();

const simpleObj1 = { name: "Alice", age: 30 };
const simpleObj2 = { name: "Alice", age: 30 };
const simpleObj3 = { name: "John", age: 40 };
const simpleObj4 = { name: "John", age: "40" };

describe("Compares plain objects", () => {
	test("Compares positively plain objects", () => {
		expect(comparator(simpleObj1, simpleObj2)).toBe(true);
	});

	test("Compares positively plain objects in reverse order", () => {
		expect(comparator(simpleObj2, simpleObj1)).toBe(true);
	});

	test("Should detect different plain objects", () => {
		expect(comparator(simpleObj1, simpleObj3)).toBe(false);
	});

	test("Should detect different plain objects in reverse order", () => {
		expect(comparator(simpleObj3, simpleObj1)).toBe(false);
	});

	test("Should detect different value types", () => {
		expect(comparator(simpleObj3, simpleObj4)).toBe(false);
	});
});

const nestedObj1 = {
	user: {
		id: 1,
		info: {
			name: "Bob",
			active: true,
		},
	},
};
const nestedObj2 = {
	user: {
		id: 1,
		info: {
			name: "Bob",
			active: true,
		},
	},
};

const nestedObj3 = {
	user: {
		id: 1,
		info: {
			name: "Bob",
			active: false,
		},
	},
};



describe("Compares nested objects", () => {
	test("Compares positively nested objects", () => {
		expect(comparator(nestedObj1, nestedObj2)).toBe(true);
	});

	test("Compares positively nested objects in reverse order", () => {
		expect(comparator(nestedObj2, nestedObj1)).toBe(true);
	});

    test("Should detect different primitive value in nested object", () => {
        expect(comparator(nestedObj3, nestedObj1)).toBe(false);
    });
});


const deepNestedObj1 = {
	company: {
		name: "TechCorp",
		departments: {
			engineering: {
				employees: [
					{ name: "Eve", role: "Developer" },
					{ name: "Frank", role: "Tester" },
				],
			},
		},
	},
};
const deepNestedObj2 = {
	company: {
		name: "TechCorp",
		departments: {
			engineering: {
				employees: [
					{ name: "Eve", role: "Developer" },
					{ name: "Frank", role: "Tester" },
				],
			},
		},
	},
};



test("Should compare positively deep nested object", () => {
	expect(comparator(deepNestedObj1, deepNestedObj2)).toBe(true);
});

const deepNestedObj3 = {
	company: {
		name: "TechCorp",
		departments: {
			engineering: {},
		},
	},
};

const deepNestedObj4 = {
	company: {
		name: "TechCorp",
		departments: {
			engineering: {
				employees: [],
			},
		},
	},
};

const deepNestedObj5 = {
	company: {
		name: "TechCorp",
		departments: {
			engineering: {},
			employees: null,
		},
	},
};

describe("Compares object with different value types", () => {
    test("Should detect difference between no array and empty array", () => {
        expect(comparator(deepNestedObj3, deepNestedObj4)).toBe(false);
    });
    test("Should detect difference between no array and null", () => {
        expect(comparator(deepNestedObj5, deepNestedObj4)).toBe(false);
    });
})


const deepNestedObj6 = {
	company: {
		name: "TechCorp",
		departments: {
			engineering: {},
			employees: [
				{ name: "Frank", role: "Tester" },
				{ name: "Eve", role: "Developer" },
			],
		},
	},
};

test("Should detect different order in array", () => {
	expect(comparator(deepNestedObj6, deepNestedObj2)).toBe(false);
});

const fullObj1 = {
	user: {
		name: "TechCorp",
	},
	admin: true,
};

const partialObj1 = {
	user: {
		name: "TechCorp",
	},
};

test("Should ignore absence of specified nested property", () => {
	// @ts-ignore
	expect(getObjectsComparator(["admin"])(fullObj1, partialObj1)).toBe(true);
});

const fullObj2 = {
	user: {
		name: "TechCorp",
	},
	admin: false,
};

const fullObj3 = {
    user: {
        name: "tehKorp"
    },
    admin: false,
}

const emptyObject = {

}

describe("Compares object with specifed ignored key array", () => {
    test("Should ignore different value of specified nested property", () => {
        expect(getObjectsComparator(["admin"])(fullObj1, fullObj2)).toBe(true);
    })
    test("Detects different keys with ignore key array", () => {
        expect(getObjectsComparator(["admin"])(fullObj1, fullObj3)).toBe(false);
    })
    test("Ignores more than 1 key and compares empty objects", () => {
        // @ts-ignore
        expect(getObjectsComparator(["admin", "user"])(fullObj1, emptyObject)).toBe(true);
    })
})


