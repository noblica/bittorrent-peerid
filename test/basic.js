// TODO: test versions
// TODO: test clients with custom versioning schemes

const { peerid } = require("../dist");
const test = require("tape");

test("basic clients from utf8 strings", t => {
	console.log(peerid);
	t.equal(peerid("-AG2053-Em6o1EmvwLtD").client, "Ares");
	t.equal(peerid("-AZ2200-6wfG2wk6wWLc").client, "Vuze");
	t.equal(peerid("-TR0072-8vd6hrmp04an").client, "Transmission");
	t.equal(peerid("-WY0300-6huHF5Pr7Vde").client, "FireTorrent");
	t.equal(peerid("-PC251Q-6huHF5Pr7Vde").client, "CacheLogic");
	t.end();
});

test("basic clients from hex strings", t => {
	t.equal(
		peerid("2D535A323133322D000000000000000000000000").client,
		"Shareaza",
	);
	t.equal(
		peerid("2D5554313730422D928446441DB0A094A01C01E5").client,
		"\u00B5Torrent",
	);
	t.equal(
		peerid("2D4C57303030312D31E0B3A0B46F7D4E954F4103").client,
		"LimeWire",
	);
	t.equal(
		peerid("2D4C50303330322D003833363536393537373030").client,
		"Lphant",
	);
	t.end();
});

test("basic clients from Buffers", t => {
	t.equal(peerid(Buffer.from("-AG2053-Em6o1EmvwLtD", "utf8")).client, "Ares");
	t.equal(peerid(Buffer.from("-AZ2200-6wfG2wk6wWLc", "utf8")).client, "Vuze");
	t.equal(
		peerid(Buffer.from("-TR0072-8vd6hrmp04an", "utf8")).client,
		"Transmission",
	);
	t.equal(
		peerid(Buffer.from("-WY0300-6huHF5Pr7Vde", "utf8")).client,
		"FireTorrent",
	);
	t.equal(
		peerid(Buffer.from("-PC251Q-6huHF5Pr7Vde", "utf8")).client,
		"CacheLogic",
	);
	t.end();
});

test("Azureus-style clients", t => {
	t.equal(peerid("-AG2053-Em6o1EmvwLtD").client, "Ares");
	t.equal(peerid("-AR1670-3Ql6wM3hgtCc").client, "Ares");
	t.equal(peerid("-AT2520-vEEt0wO6v0cr").client, "Artemis");
	t.equal(peerid("-AZ2200-6wfG2wk6wWLc").client, "Vuze");
	t.equal(peerid("-NE1090002IKyMn4g7Ko").client, "BT Next Evolution");
	t.equal(peerid("-BR0332-!XVceSn(*KIl").client, "BitRocket");
	t.equal(
		peerid("2D46473031383075F80057821359D64BB3DFD265").client,
		"FlashGet",
	);
	t.equal(peerid("-GR6300-13s3iFKmbArc").client, "GetRight");
	t.equal(peerid("-HL0290-xUO*9ugvENUE").client, "Halite");
	t.equal(peerid("-KT11R1-693649213030").client, "KTorrent");
	t.equal(
		peerid("2D4B543330302D006A7139727958377731756A4B").client,
		"KTorrent",
	);
	t.equal(
		peerid("2D6C74304232302D0D739B93E6BE21FEBB557B20").client,
		"libTorrent (Rakshasa) / rTorrent*",
	);
	t.equal(peerid("-LT0D00-eZ0PwaDDr-~v").client, "libtorrent (Rasterbar)");
	t.equal(peerid("-LK0140-ATIV~nbEQAMr").client, "linkage");
	t.equal(
		peerid("2D4C57303030312D31E0B3A0B46F7D4E954F4103").client,
		"LimeWire",
	);
	t.equal(
		peerid("2D4C50303330322D003833363536393537373030").client,
		"Lphant",
	);
	t.equal(
		peerid("2D535A323133322D000000000000000000000000").client,
		"Shareaza",
	);
	t.equal(peerid("-ST0117-01234567890!").client, "SymTorrent");
	t.equal(peerid("-TR0006-01234567890!").client, "Transmission");
	t.equal(peerid("-TR072Z-zihst5yvg22f").client, "Transmission");
	t.equal(peerid("-TR0072-8vd6hrmp04an").client, "Transmission");
	t.equal(peerid("-TT210w-dq!nWf~Qcext").client, "TuoTu");
	t.equal(
		peerid("2D5554313730422D928446441DB0A094A01C01E5").client,
		"\u00B5Torrent",
	);
	t.equal(
		peerid("2D5647323634342D4FD62CDA69E235717E3BB94B").client,
		"\u54c7\u560E (Vagaa)",
	);
	t.equal(peerid("-WY0300-6huHF5Pr7Vde").client, "FireTorrent");
	t.equal(peerid("-PC251Q-6huHF5Pr7Vde").client, "CacheLogic");
	t.equal(peerid("-KG2450-BDEw8OM14Hk6").client, "KGet");
	t.end();
});

test("Shadow-style clients", t => {
	t.equal(peerid("A--------YMyoBPXYy2L").client, "ABC");
	t.equal(peerid("413236392D2D2D2D345077199FAEC4A673BECA01").client, "ABC");
	t.equal(peerid("A310--001v5Gysr4NxNK").client, "ABC");
	t.equal(peerid("T03C-----6tYolxhVUFS").client, "BitTornado");
	t.equal(peerid("T03I--008gY6iB6Aq27C").client, "BitTornado");
	t.equal(peerid("T0390----5uL5NvjBe2z").client, "BitTornado");
	t.equal(peerid("R100--003hR6s07XWcov").client, "Tribler");
	t.equal(peerid("R37---003uApHy851-Pq").client, "Tribler");
	t.end();
});

test("Simple-style clients", t => {
	t.equal(
		peerid("417A75726575730000000000000000A076F0AEF7").client,
		"Azureus",
	);
	t.equal(
		peerid("2D2D2D2D2D417A757265757354694E7A2A6454A7").client,
		"Azureus",
	);
	t.equal(
		peerid("2D4733416E6F6E796D6F757370E8D9CB30250AD4").client,
		"G3 Torrent",
	);
	t.equal(
		peerid("6172636C696768742E68652EA5860C157A5ADC35").client,
		"Hurricane Electric",
	);
	t.equal(peerid("Pando-6B511B691CAC2E").client, "Pando");
	t.equal(
		peerid("2D55543137302D00AF8BC5ACCC4631481EB3EB60").client,
		"\u00B5Torrent",
	);
	t.end();
});

test("Mainline-style clients", t => {
	t.equal(peerid("M5-0-7--9aa757efd5be").client, "Mainline");
	t.equal(
		peerid("0000000000000000000000004C53441933104277").client,
		"Mainline",
	);
	t.equal(peerid("S3-1-0-0--0123456789").client, "Amazon AWS S3");
	t.end();
});

test("Version substring-style clients", t => {
	t.equal(
		peerid("4269744C657430319AEA4E02A09E318D70CCF47D").client,
		"Bitlet",
	);
	t.equal(peerid("-BOWP05-EPICNZOGQPHP").client, "BitsOnWheels");
	t.equal(peerid("Mbrst1-1-32e3c394b43").client, "Burst!");
	t.equal(peerid("OP7685f2c1495b1680bf").client, "Opera");
	t.equal(peerid("O100634008270e29150a").client, "Opera");
	t.equal(peerid("00455253416E6F6E796D6F757382BE4275024AE3").client, "Rufus");
	t.equal(
		peerid("444E413031303030DD01C9B2DA689E6E02803E91").client,
		"BitTorrent DNA",
	);
	t.equal(peerid("BTM21abcdefghijklmno").client, "BTuga Revolution");
	t.equal(
		peerid("4150302E3730726333302D3E3EB87B31F241DBFE").client,
		"AllPeers",
	);
	t.equal(
		peerid("45787420EC7CC30033D7801FEEB713FBB0557AC4").client,
		"External Webseed",
	);
	t.equal(peerid("QVOD00541234567890AB").client, "QVOD");
	t.equal(peerid("TB100----abcdefghijk").client, "Top-BT");
	t.end();
});

test("BitComet/Lord/Spirit", t => {
	t.equal(
		peerid("6578626300387A4463102D6E9AD6723B339F35A9").client,
		"BitComet",
	);
	t.equal(
		peerid("6578626300384C4F52443200048ECED57BD71028").client,
		"BitLord",
	);
	t.equal(
		peerid("4D342D302D322D2D6898D9D0CAF25E4555445030").client,
		"BitSpirit?",
	);
	t.equal(
		peerid("000242539B7ED3E058A8384AA748485454504254").client,
		"BitSpirit",
	);
	t.equal(
		peerid("000342530724889644C595308A5FF2CA55445030").client,
		"BitSpirit",
	);
	t.end();
});

test("Misc clients", t => {
	t.equal(peerid("TIX0137-i6i6f0i5d5b7").client, "Tixati");
	t.equal(peerid("2D464C3039C6F22D5F436863327A6D792E283867").client, "folx");
	t.equal(peerid("-KT22B1-695754334315").client, "KTorrent");
	t.equal(peerid("-KT2140-584815613993").client, "KTorrent");
	t.equal(
		peerid("2D554D3135313130C964BE6F15CA71EF02AF2DD7").client,
		"\u00B5Torrent Mac",
	);
	t.equal(
		peerid("2D4D47314372302D3234705F6436000055673362").client,
		"MediaGet",
	);
	t.equal(peerid("-#@0000-Em6o1EmvwLtD").client, "Invalid PeerID");
	t.equal(
		peerid("2D4D47323111302D3234705F6436706E55673362").client,
		"MediaGet",
	);
	t.equal(peerid("-AN2171-nr17R1h19O7n").client, "Ares");
	t.equal(
		peerid("2D55543334302D000971FDE48C3688D2023506FC").client,
		"\u00B5Torrent",
	);
	t.end();
});

test("Unknown clients", t => {
	t.equal(
		peerid("B5546F7272656E742F3330323520202020202020").client,
		"unknown",
	);
	t.equal(
		peerid("0000000000000000317DA32F831FF041A515FE3C").client,
		"unknown",
	);
	t.equal(
		peerid("000000DF05020020100020200008000000004028").client,
		"unknown",
	);
	t.equal(
		peerid("0000000000000000F106CE44F179A2498FAC614F").client,
		"unknown",
	);
	t.equal(
		peerid("E7F163BB0E5FCD35005C09A11BC274C42385A1A0").client,
		"unknown",
	);
	t.equal(
		peerid("2D464435315DC72D37426772646B4C3850434239").client,
		"unknown",
	);
	t.equal(
		peerid("2D4249313730302D66466D324E356B5848335068").client,
		"unknown",
	);
	t.end();
});

test("WebTorrent", t => {
	const parsed = peerid("-WW0000-Em6o1EmvwLtD");
	t.equal(parsed.client, "WebTorrent");
	t.equal(parsed.version, "0.0");
	t.equal(peerid("-WW0100-Em6o1EmvwLtD").version, "1.0");
	t.equal(peerid("-WW1000-Em6o1EmvwLtD").version, "10.0");
	t.equal(peerid("-WW0001-Em6o1EmvwLtD").version, "0.1");
	t.equal(peerid("-WW0010-Em6o1EmvwLtD").version, "0.10");
	t.equal(peerid("-WW0011-Em6o1EmvwLtD").version, "0.11");
	t.equal(peerid("-WW1011-Em6o1EmvwLtD").version, "10.11");
	t.equal(peerid("-WW1111-Em6o1EmvwLtD").version, "11.11");
	t.end();
});

test("WebTorrent Desktop", t => {
	const parsed = peerid("-WD0007-Em6o1EmvwLtD");
	t.equal(parsed.client, "WebTorrent Desktop");
	t.equal(parsed.version, "0.7");
	t.end();
});
