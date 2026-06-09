-- PostgreSQL database dump

-- \restrict ZwCKxyNioAhBbpEwzet544kLRclOxnyZGv1xbwpYymaClts0tH6t6jTyqo1IZwJ

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.progress (
    id integer NOT NULL,
    user_id integer,
    weak_topics text[],
    strong_topics text[],
    average_score integer,
    last_quiz_date timestamp without time zone
);


ALTER TABLE public.progress OWNER TO postgres;

--
-- Name: progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.progress_id_seq OWNER TO postgres;

--
-- Name: progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.progress_id_seq OWNED BY public.progress.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    topic_id integer,
    difficulty character varying(20),
    question text NOT NULL,
    option_a text,
    option_b text,
    option_c text,
    option_d text,
    correct_answer text,
    explanation text
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: quiz_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_results (
    id integer NOT NULL,
    user_id integer,
    topic_id integer,
    score integer,
    total_questions integer,
    correct_answers integer,
    wrong_answers integer,
    attempts integer DEFAULT 1,
    time_taken integer,
    difficulty character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    percentage integer
);


ALTER TABLE public.quiz_results OWNER TO postgres;

--
-- Name: quiz_results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_results_id_seq OWNER TO postgres;

--
-- Name: quiz_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_results_id_seq OWNED BY public.quiz_results.id;


--
-- Name: recommendations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    user_id integer,
    recommended_topic character varying(100),
    recommendation_reason text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.recommendations OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recommendations_id_seq OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recommendations_id_seq OWNED BY public.recommendations.id;


--
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    topic_name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topics_id_seq OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password text NOT NULL,
    level character varying(20) DEFAULT 'Beginner'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress ALTER COLUMN id SET DEFAULT nextval('public.progress_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: quiz_results id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_results ALTER COLUMN id SET DEFAULT nextval('public.quiz_results_id_seq'::regclass);


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.recommendations_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.progress (id, user_id, weak_topics, strong_topics, average_score, last_quiz_date) FROM stdin;
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, topic_id, difficulty, question, option_a, option_b, option_c, option_d, correct_answer, explanation) FROM stdin;
1	1	easy	What is an array?	A collection of same-type elements	A database query	A network device	An operating system	A collection of same-type elements	An array stores elements of the same data type in contiguous memory.
2	1	easy	Which data structure follows FIFO?	Stack	Queue	Tree	Graph	Queue	Queue means First In, First Out.
3	1	easy	Which data structure follows LIFO?	Queue	Stack	Array	Heap	Stack	Stack means Last In, First Out.
4	1	easy	What is the root node of a tree?	Topmost node	Last node	Leaf node	Sibling node	Topmost node	The root is the first node in a tree structure.
5	1	easy	Which of these is a linear data structure?	Tree	Graph	Array	Heap	Array	Array stores items in a sequential manner.
6	1	easy	What does a linked list use to connect nodes?	Pointers	Indexes	Counters	Keys	Pointers	Each node stores a pointer to the next node.
7	1	easy	In a singly linked list, each node points to?	Previous node	Next node	Root node	Parent node	Next node	A singly linked list points to the next node only.
8	1	easy	Which data structure is used in recursion?	Stack	Queue	Graph	Heap	Stack	Function calls are managed using the call stack.
9	1	easy	What is a leaf node?	Node with no children	Node with two children	Root node	Parent node	Node with no children	A leaf node has no child nodes.
10	1	easy	How many children can a binary tree node have?	One	Two	Three	Four	Two	A binary tree node can have at most two children.
11	1	easy	Which traversal visits root first?	Inorder	Postorder	Preorder	Level order	Preorder	Preorder traversal visits root before children.
12	1	easy	Which traversal visits left, root, right?	Preorder	Inorder	Postorder	Level order	Inorder	Inorder traversal is left-root-right.
13	1	easy	Which traversal visits left, right, root?	Preorder	Inorder	Postorder	DFS	Postorder	Postorder traversal is left-right-root.
14	1	easy	What is a graph made of?	Nodes and edges	Rows and columns	Keys and values	Stacks and queues	Nodes and edges	A graph consists of vertices and edges.
15	1	easy	What is the top element of a stack called?	Front	Rear	Top	Head	Top	The top is the last pushed item in a stack.
16	1	easy	What is the first element of a queue called?	Front	Top	Bottom	Leaf	Front	Deletion in a queue happens from the front.
17	1	medium	What is the time complexity of binary search?	O(n)	O(log n)	O(n log n)	O(1)	O(log n)	Binary search halves the search space each step.
18	1	medium	Which data structure is best for implementing undo operations?	Queue	Stack	Tree	Graph	Stack	Undo operations use last-in-first-out behavior.
19	1	medium	What is a circular queue?	Queue with one end connected to another	Queue with no front	Queue with two stacks	Queue with one element	Queue with one end connected to another	A circular queue connects the last position back to the first.
20	1	medium	Which traversal uses a queue?	DFS	BFS	Inorder	Postorder	BFS	Breadth-first search uses a queue.
21	1	medium	What is the time complexity of inserting at the beginning of a linked list?	O(1)	O(n)	O(log n)	O(n log n)	O(1)	Insertion at the head of a linked list is constant time.
22	1	medium	Which data structure is used for breadth-first search?	Stack	Queue	Array	Heap	Queue	BFS explores level by level using a queue.
23	1	medium	What is an adjacency matrix used for?	Representing graph edges	Representing stacks	Representing queues	Representing trees only	Representing graph edges	An adjacency matrix stores graph connections in matrix form.
24	1	medium	What is the height of a tree?	Number of nodes	Longest path from root to leaf	Number of leaf nodes	Number of edges only	Longest path from root to leaf	Tree height is the longest path from root to any leaf.
25	1	medium	What is a balanced binary tree?	Tree with equal left and right values	Tree where height difference is small	Tree with one node	Tree with no leaves	Tree where height difference is small	A balanced tree keeps subtree heights nearly equal.
26	1	medium	Which structure stores key-value pairs?	Array	Hash table	Stack	Queue	Hash table	Hash tables map keys to values.
27	1	medium	What is collision in hashing?	Two keys map to same index	Tree balance issue	Queue overflow	Stack underflow	Two keys map to same index	Collision occurs when different keys hash to the same slot.
28	1	medium	What is the average search time in a hash table?	O(1)	O(n)	O(log n)	O(n log n)	O(1)	Hash tables provide constant average lookup time.
29	1	hard	What is the worst-case time complexity of searching in a hash table?	O(1)	O(log n)	O(n)	O(n log n)	O(n)	In worst case, many collisions may cause linear search.
30	1	hard	Which tree traversal is used to evaluate expression trees?	Preorder	Inorder	Postorder	Level order	Postorder	Postorder evaluates children before the operator.
31	1	hard	What is the time complexity of heapify operation?	O(log n)	O(n)	O(n log n)	O(1)	O(log n)	Heapify on one node takes logarithmic time.
32	1	hard	Which structure is best for priority-based insertion and deletion?	Array	Queue	Heap	Linked list	Heap	Heaps are designed for priority access.
33	1	hard	What is the time complexity of building a heap from n elements?	O(n)	O(n log n)	O(log n)	O(n^2)	O(n)	A heap can be built in linear time using bottom-up heapify.
34	1	hard	In a binary search tree, what property holds?	Left subtree has greater values	Right subtree has smaller values	Left subtree has smaller values	All nodes are equal	Left subtree has smaller values	BST left children are smaller and right children are larger.
35	1	hard	What is the time complexity of searching in a balanced BST?	O(1)	O(log n)	O(n)	O(n log n)	O(log n)	Balanced BST search follows tree height, which is logarithmic.
36	1	hard	Which data structure is used in backtracking algorithms?	Queue	Stack	Graph	Heap	Stack	Backtracking often uses recursion and the stack.
37	1	hard	What is a trie mainly used for?	Sorting numbers	String searching	Matrix multiplication	Graph coloring	String searching	Tries are efficient for prefix-based string operations.
38	1	hard	What is the time complexity of deleting a node in a linked list if the node pointer is given?	O(1)	O(n)	O(log n)	O(n log n)	O(1)	With direct access, deletion only needs pointer updates.
39	1	hard	What is the time complexity of inorder traversal of a binary tree?	O(log n)	O(n)	O(n log n)	O(1)	O(n)	Every node is visited once in inorder traversal.
40	1	hard	What is the advantage of linked list over array?	Random access	Fixed size	Dynamic size	Faster indexing	Dynamic size	Linked lists can grow and shrink dynamically.
41	1	hard	Which graph traversal uses recursion naturally?	BFS	DFS	Dijkstra	Kruskal	DFS	Depth-first search is commonly implemented recursively.
42	1	hard	What is the time complexity of inserting into a binary search tree on average?	O(1)	O(log n)	O(n)	O(n log n)	O(log n)	Average insertion follows tree height in a balanced-like BST.
43	1	hard	What is a min heap?	Parent is greater than children	Parent is smaller than children	All nodes equal	Only leaf nodes sorted	Parent is smaller than children	In a min heap, the smallest element is at the root.
44	1	hard	What is a max heap?	Parent is smaller than children	Parent is greater than children	Left child smaller than right child	Root has no value	Parent is greater than children	In a max heap, the largest element is at the root.
45	1	hard	Which sorting structure uses a heap?	Quick sort	Heap sort	Merge sort	Insertion sort	Heap sort	Heap sort builds and uses a heap data structure.
46	1	hard	What is the space complexity of recursive factorial?	O(1)	O(n)	O(log n)	O(n log n)	O(n)	Recursive calls use stack space proportional to n.
47	1	hard	Which traversal of a binary tree gives sorted order in BST?	Preorder	Inorder	Postorder	Level order	Inorder	Inorder traversal of a BST returns sorted keys.
48	1	hard	Which operation is expensive in an array?	Accessing an element	Appending at end	Inserting in the middle	Reading first element	Inserting in the middle	Middle insertion requires shifting elements.
49	1	hard	Which data structure supports both FIFO and LIFO concepts in some algorithms?	Stack	Queue	Deque	Array	Deque	Deque supports insertion and deletion at both ends.
50	1	hard	What is a deque?	Double-ended queue	Depth-ended queue	Duplicate queue	Dynamic edge queue	Double-ended queue	A deque allows operations at both front and rear.
51	1	hard	Which graph representation is better for sparse graphs?	Adjacency matrix	Adjacency list	Incidence table	Edge array only	Adjacency list	Adjacency lists use less memory for sparse graphs.
52	1	hard	What is the time complexity of BFS on adjacency list?	O(V+E)	O(VE)	O(V^2)	O(log n)	O(V+E)	BFS visits each vertex and edge at most once.
53	1	hard	What is the time complexity of DFS on adjacency list?	O(V+E)	O(VE)	O(V^2)	O(log n)	O(V+E)	DFS also processes each vertex and edge once.
54	1	hard	Which data structure is ideal for implementing recursion?	Queue	Stack	Heap	Graph	Stack	Recursive function calls are stored on the call stack.
55	2	easy	What is an algorithm?	A step-by-step method to solve a problem	A type of database	A programming language	A computer screen	A step-by-step method to solve a problem	An algorithm is a sequence of instructions to solve a problem.
56	2	easy	Which algorithm is used to find an element in a sorted list efficiently?	Linear search	Binary search	Bubble sort	Merge sort	Binary search	Binary search works on sorted lists by dividing the search range.
57	2	easy	What is the time complexity of linear search?	O(1)	O(log n)	O(n)	O(n log n)	O(n)	Linear search may check every element once.
58	2	easy	Which sorting algorithm repeatedly swaps adjacent elements?	Selection sort	Insertion sort	Bubble sort	Merge sort	Bubble sort	Bubble sort repeatedly compares adjacent elements and swaps them.
59	2	easy	Which sorting algorithm selects the smallest element each pass?	Bubble sort	Selection sort	Quick sort	Heap sort	Selection sort	Selection sort finds the minimum element and places it correctly.
60	2	easy	What is recursion?	A function calling itself	A loop with no end	A database query	A tree traversal only	A function calling itself	Recursion is when a function solves a problem by calling itself.
61	2	easy	Which of the following is a divide and conquer algorithm?	Bubble sort	Binary search	Linear search	Selection sort	Binary search	Binary search divides the problem into smaller parts.
62	2	easy	What is the base case in recursion?	The starting point that stops recursion	The longest recursive call	The final output only	The main function	The starting point that stops recursion	The base case prevents infinite recursion.
63	2	easy	Which algorithm is often used to sort small datasets efficiently?	Insertion sort	Merge sort	Heap sort	Quick sort	Insertion sort	Insertion sort works well on small or nearly sorted data.
64	2	easy	Which search technique checks each element one by one?	Binary search	Linear search	Quick sort	Merge sort	Linear search	Linear search inspects elements sequentially.
65	2	easy	What is the output of a sorting algorithm?	Random order	Descending order only	Ordered arrangement	Graph structure	Ordered arrangement	Sorting arranges elements in a specific order.
66	2	easy	Which algorithm is used to find the greatest common divisor efficiently?	Euclidean algorithm	Binary search	Bubble sort	DFS	Euclidean algorithm	The Euclidean algorithm is used for GCD calculation.
67	2	easy	What does brute force mean?	Trying all possible solutions	Using recursion only	Using trees only	Using hashing only	Trying all possible solutions	Brute force means checking all candidate solutions.
68	2	easy	Which algorithm is used in graph traversal?	DFS	Sorting	Searching a file	Stack overflow	DFS	DFS is a common graph traversal algorithm.
69	2	easy	What is the main advantage of binary search over linear search?	Uses less memory	Faster on sorted data	Works on unsorted data	Needs no comparisons	Faster on sorted data	Binary search reduces the search space quickly.
70	2	easy	Which is a stable sorting algorithm?	Bubble sort	Quick sort	Heap sort	Selection sort	Bubble sort	Bubble sort preserves order of equal elements.
71	2	easy	What is the time complexity of bubble sort in worst case?	O(n)	O(log n)	O(n^2)	O(n log n)	O(n^2)	Bubble sort compares many pairs in worst case.
72	2	medium	What is the average time complexity of quick sort?	O(n^2)	O(log n)	O(n log n)	O(n)	O(n log n)	Quick sort is efficient on average with divide and conquer.
73	2	medium	What is the worst-case time complexity of quick sort?	O(n)	O(n log n)	O(n^2)	O(log n)	O(n^2)	Worst case occurs when partitions are highly unbalanced.
74	2	medium	Which sorting algorithm is based on merging sorted subarrays?	Selection sort	Merge sort	Bubble sort	Insertion sort	Merge sort	Merge sort combines sorted halves.
75	2	medium	What is the time complexity of merge sort?	O(n^2)	O(n log n)	O(log n)	O(n)	O(n log n)	Merge sort divides and merges in logarithmic levels.
76	2	medium	Which algorithm uses a pivot element?	Merge sort	Quick sort	Heap sort	Bubble sort	Quick sort	Quick sort partitions data around a pivot.
77	2	medium	What is dynamic programming?	Solving problems by storing subproblem results	A sorting method	A type of hardware	A tree traversal method	Solving problems by storing subproblem results	Dynamic programming avoids repeated calculations.
78	2	medium	What is memoization?	Storing previously computed results	Sorting arrays	Using queues	Using graphs	Storing previously computed results	Memoization caches results for reuse.
79	2	medium	Which algorithm technique breaks a problem into overlapping subproblems?	Greedy	Dynamic programming	Brute force	Linear search	Dynamic programming	DP is useful when subproblems overlap.
80	2	medium	What is the time complexity of insertion sort in worst case?	O(n)	O(log n)	O(n^2)	O(n log n)	O(n^2)	Insertion sort may shift many elements in reverse order.
81	2	medium	Which algorithm is generally used to find shortest paths in weighted graphs with non-negative edges?	BFS	Dijkstra	DFS	Kruskal	Dijkstra	Dijkstra finds shortest paths with non-negative weights.
82	2	medium	Which algorithm is used for minimum spanning tree?	Dijkstra	Kruskal	Binary search	Bubble sort	Kruskal	Kruskal builds a minimum spanning tree using edges.
83	2	medium	Which technique chooses the locally optimal choice at each step?	Dynamic programming	Greedy algorithm	Backtracking	Recursion	Greedy algorithm	Greedy algorithms make the best local choice.
84	2	medium	What is backtracking?	Trying all possibilities and undoing invalid choices	Sorting elements	Using hashing	Using recursion only	Trying all possibilities and undoing invalid choices	Backtracking explores and retracts when a path fails.
85	2	medium	Which algorithm is used for topological sorting in DAGs?	DFS-based approach	Bubble sort	Binary search	Linear search	DFS-based approach	Topological sorting can be done using DFS.
86	2	medium	Which data structure is commonly used in DFS?	Queue	Stack	Heap	Array	Stack	DFS uses a stack or recursion.
87	2	medium	What is the average time complexity of searching in a balanced binary search tree?	O(1)	O(log n)	O(n)	O(n log n)	O(log n)	Balanced trees keep search time logarithmic.
88	2	medium	What is the purpose of hashing in algorithms?	To sort data	To find data quickly	To compress files	To draw graphs	To find data quickly	Hashing helps with fast lookup.
89	2	medium	Which algorithm technique is used to solve the 0/1 knapsack problem efficiently?	Dynamic programming	Binary search	DFS	Selection sort	Dynamic programming	Knapsack is a classic DP problem.
90	2	hard	What is the time complexity of heap sort?	O(n)	O(n log n)	O(n^2)	O(log n)	O(n log n)	Heap sort repeatedly extracts the maximum or minimum element.
91	2	hard	Which algorithm is used to detect cycles in a directed graph?	DFS with recursion stack	Binary search	Bubble sort	Merge sort	DFS with recursion stack	Cycle detection in directed graphs commonly uses DFS and recursion stack.
92	2	hard	Which algorithm is used to compute strongly connected components?	Kruskal	Kosaraju	Dijkstra	Prim	Kosaraju	Kosarajuâ€™s algorithm finds strongly connected components.
93	2	hard	What is the worst-case time complexity of merge sort?	O(n)	O(n log n)	O(n^2)	O(log n)	O(n log n)	Merge sort remains O(n log n) in worst case.
94	2	hard	Which shortest path algorithm can handle negative edge weights but no negative cycles?	Dijkstra	Bellman-Ford	BFS	Kruskal	Bellman-Ford	Bellman-Ford works with negative weights.
95	2	hard	What is the time complexity of Bellman-Ford?	O(V+E)	O(VE)	O(log n)	O(n log n)	O(VE)	Bellman-Ford relaxes edges repeatedly for V-1 rounds.
96	2	hard	Which algorithm is used for minimum spanning tree using priority queue?	Prim	Quick sort	DFS	Binary search	Prim	Primâ€™s algorithm grows the tree using minimum edges.
97	2	hard	What is the purpose of the partition step in quick sort?	To merge arrays	To divide elements around pivot	To find maximum value	To create a heap	To divide elements around pivot	Partition places smaller and larger values relative to pivot.
98	2	hard	Which algorithm technique often uses overlapping subproblems and optimal substructure?	Greedy	Dynamic programming	Brute force	Sorting	Dynamic programming	DP works when optimal substructure exists.
99	2	hard	What is the time complexity of Floyd-Warshall algorithm?	O(V+E)	O(V^2)	O(V^3)	O(E log V)	O(V^3)	Floyd-Warshall checks all triples of vertices.
100	2	hard	Which algorithm finds all pairs shortest paths in a graph?	Dijkstra	Floyd-Warshall	Kruskal	DFS	Floyd-Warshall	Floyd-Warshall solves all-pairs shortest path.
101	2	hard	What is the time complexity of DFS on adjacency list?	O(V+E)	O(VE)	O(V^2)	O(log n)	O(V+E)	DFS visits each vertex and edge once.
102	2	hard	Which algorithm is used to solve the traveling salesman problem approximately?	Greedy heuristic	Binary search	Bubble sort	Linear search	Greedy heuristic	Approximation or heuristic methods are often used for TSP.
103	2	hard	What is the difference between stable and unstable sorting?	Stable preserves order of equal elements	Unstable uses less memory	Stable is always faster	Unstable works only on numbers	Stable preserves order of equal elements	Stability refers to the order of equal keys.
104	2	hard	Which algorithm is known for finding articulation points in a graph?	Tarjan	Heap sort	Quick sort	Binary search	Tarjan	Tarjanâ€™s algorithm is used in graph analysis.
105	2	hard	What is the time complexity of topological sort using DFS?	O(V+E)	O(VE)	O(V^2)	O(log n)	O(V+E)	Topological sorting by DFS processes each vertex and edge once.
106	2	hard	Which algorithm is typically used for pattern matching in strings efficiently?	KMP	Bubble sort	DFS	Prim	KMP	KMP avoids rechecking characters unnecessarily.
107	2	hard	What is the advantage of KMP over naive string matching?	Uses no memory	Avoids redundant comparisons	Sorts strings	Works only on numbers	Avoids redundant comparisons	KMP uses prefix information to skip comparisons.
108	2	hard	What is the time complexity of KMP pattern matching?	O(mn)	O(n)	O(m+n)	O(n^2)	O(m+n)	KMP preprocesses the pattern and scans text linearly.
109	2	hard	Which algorithm is used in solving N-Queens?	Backtracking	Binary search	Merge sort	Greedy only	Backtracking	N-Queens explores placements and backtracks on conflict.
110	2	hard	Which technique is used when a problem solution depends on smaller versions of the same problem?	Divide and conquer	Recursion	Dynamic programming	Hashing	Recursion	Recursive structure means a problem calls smaller versions of itself.
111	2	hard	What is the main purpose of algorithm analysis?	To make code prettier	To measure efficiency	To add comments	To create UI	To measure efficiency	Algorithm analysis studies time and space requirements.
112	3	easy	What is a database?	A collection of organized data	A programming language	A hardware device	A web browser	A collection of organized data	A database stores data in an organized way.
113	3	easy	What does SQL stand for?	Structured Query Language	Simple Query List	System Query Logic	Standard Question Language	Structured Query Language	SQL stands for Structured Query Language.
114	3	easy	Which SQL command is used to retrieve data?	INSERT	SELECT	UPDATE	DELETE	SELECT	SELECT is used to fetch records from a table.
115	3	easy	Which SQL command is used to add new data?	INSERT	SELECT	ALTER	DROP	INSERT	INSERT adds new rows into a table.
116	3	easy	Which SQL command is used to change existing data?	UPDATE	CREATE	SELECT	GRANT	UPDATE	UPDATE modifies existing records.
117	3	easy	Which SQL command removes data from a table?	DELETE	DROP	ALTER	JOIN	DELETE	DELETE removes rows from a table.
118	3	easy	What is a table in a database?	A collection of rows and columns	A programming file	A network protocol	A sort method	A collection of rows and columns	A table stores data in rows and columns.
119	3	easy	What is a row also called?	Tuple	Column	Key	Index	Tuple	A row represents one record or tuple.
120	3	easy	What is a column also called?	Attribute	Tuple	Record	Index	Attribute	A column stores a specific field or attribute.
121	3	easy	What is a primary key?	A unique identifier for each row	A foreign table	A duplicate value	A null value	A unique identifier for each row	Primary key uniquely identifies each record.
122	3	easy	Can a primary key contain duplicate values?	Yes	No	Sometimes	Only if allowed	No	A primary key must be unique.
123	3	easy	Can a primary key be NULL?	Yes	No	Sometimes	Only in views	No	Primary keys cannot be NULL.
124	3	easy	What is a foreign key?	A field linking one table to another	A duplicate column	A file extension	A query type	A field linking one table to another	Foreign keys create relationships between tables.
125	3	easy	Which SQL clause filters rows?	WHERE	ORDER BY	GROUP BY	HAVING	WHERE	WHERE is used to filter records.
126	3	easy	Which clause sorts records?	GROUP BY	ORDER BY	HAVING	LIMIT	ORDER BY	ORDER BY sorts result sets.
127	3	easy	Which command creates a new table?	CREATE TABLE	MAKE TABLE	ADD TABLE	NEW TABLE	CREATE TABLE	CREATE TABLE defines a new table.
128	3	easy	Which command is used to delete a table?	DROP TABLE	REMOVE TABLE	DELETE TABLE	CLEAR TABLE	DROP TABLE	DROP TABLE removes the table structure.
129	3	medium	What is normalization?	Process of organizing data to reduce redundancy	Process of deleting rows	Process of indexing	Process of joining tables	Process of organizing data to reduce redundancy	Normalization reduces duplicate data and improves consistency.
130	3	medium	What is the first normal form (1NF)?	Eliminate repeating groups	Remove all keys	Create indexes	Add duplicate columns	Eliminate repeating groups	1NF requires atomic values and no repeating groups.
131	3	medium	What does 2NF require?	No transitive dependency	No partial dependency	No primary key	No foreign key	No partial dependency	2NF removes partial dependency on a composite key.
132	3	medium	What does 3NF require?	No transitive dependency	No duplicate rows	No indexes	No constraints	No transitive dependency	3NF removes transitive dependencies.
133	3	medium	What is a join?	Combining rows from two or more tables	Removing duplicate rows	Sorting a table	Deleting a record	Combining rows from two or more tables	Joins combine related data from multiple tables.
134	3	medium	Which join returns only matching rows?	LEFT JOIN	RIGHT JOIN	INNER JOIN	FULL JOIN	INNER JOIN	INNER JOIN returns rows that match in both tables.
135	3	medium	Which join returns all rows from the left table?	INNER JOIN	LEFT JOIN	RIGHT JOIN	CROSS JOIN	LEFT JOIN	LEFT JOIN returns all left rows and matching right rows.
136	3	medium	What is indexing used for?	To speed up data retrieval	To delete records	To encrypt data	To create tables	To speed up data retrieval	Indexes improve query performance.
137	3	medium	What is a unique key?	A key that ensures all values are different	A key with duplicate values	A foreign key only	A NULL key	A key that ensures all values are different	Unique keys prevent duplicate values in a column.
138	3	medium	Can a table have multiple unique keys?	No	Yes	Only one	Only if empty	Yes	A table can have more than one unique constraint.
139	3	medium	What is a candidate key?	A possible primary key	A foreign key only	A duplicate column	A join condition	A possible primary key	Candidate keys are columns that can uniquely identify rows.
140	3	medium	What is a composite key?	A key made of more than one column	A duplicate key	A foreign key only	A null key	A key made of more than one column	Composite keys use multiple columns together.
141	3	medium	What is the purpose of GROUP BY?	To group rows with same values	To delete duplicates	To join tables	To create a database	To group rows with same values	GROUP BY collects rows with common values.
142	3	medium	What is HAVING used for?	Filtering groups after aggregation	Sorting rows	Adding columns	Deleting tables	Filtering groups after aggregation	HAVING filters results of GROUP BY.
143	3	medium	What does COUNT() do?	Counts rows	Adds numbers	Sorts values	Deletes rows	Counts rows	COUNT() returns number of rows or values.
144	3	medium	What does AVG() return?	Average value	Maximum value	Minimum value	All values	Average value	AVG() computes the mean of numeric values.
145	3	medium	What is a database schema?	Structure of database objects	A type of join	A SQL function	A backup file	Structure of database objects	Schema defines tables, columns, and relationships.
146	3	medium	What is the difference between DELETE and DROP?	DELETE removes rows, DROP removes table	DROP removes rows, DELETE removes table	Both are same	Neither removes data	DELETE removes rows, DROP removes table	DELETE removes data, DROP removes structure.
147	3	hard	What is the difference between a primary key and a unique key?	Primary key allows NULL, unique key does not	Primary key is unique and not NULL, unique key can allow NULL	They are exactly same	Unique key cannot be indexed	Primary key is unique and not NULL, unique key can allow NULL	Primary keys identify rows and cannot be NULL.
148	3	hard	What is a transitive dependency?	A non-key attribute depends on another non-key attribute	A key depends on a table	A row depends on an index	A join depends on a column	A non-key attribute depends on another non-key attribute	Transitive dependency is removed in 3NF.
149	3	hard	Which normal form removes multivalued dependency?	1NF	2NF	3NF	4NF	4NF	Fourth normal form deals with multivalued dependencies.
150	3	hard	Which SQL keyword is used to remove duplicate rows?	DISTINCT	UNIQUE	REMOVE	FILTER	DISTINCT	DISTINCT eliminates duplicate rows from results.
151	3	hard	What is a transaction in a database?	A sequence of operations treated as one unit	A table join	A backup file	A query index	A sequence of operations treated as one unit	A transaction groups operations into a single logical unit.
152	3	hard	What does ACID stand for?	Atomicity, Consistency, Isolation, Durability	Access, Create, Insert, Delete	Array, Column, Index, Data	Action, Commit, Integrity, Delay	Atomicity, Consistency, Isolation, Durability	ACID describes important transaction properties.
153	3	hard	What does atomicity ensure?	All parts of a transaction succeed or fail together	Transactions run in parallel	Data is sorted	Indexes are created	All parts of a transaction succeed or fail together	Atomicity means all-or-nothing execution.
154	3	hard	What does isolation ensure?	Transactions do not interfere with each other	Data is always encrypted	Tables are always normalized	Rows are deleted safely	Transactions do not interfere with each other	Isolation prevents concurrent transactions from affecting each other.
155	3	hard	What is a deadlock?	Two transactions waiting on each other forever	A table with no rows	A type of index	A unique constraint	Two transactions waiting on each other forever	Deadlock happens when transactions block each other indefinitely.
156	3	hard	What is a clustered index?	An index that determines physical order of data	A duplicate table	A join type	A backup plan	An index that determines physical order of data	Clustered indexes sort and store table rows physically.
157	3	hard	What is a non-clustered index?	An index stored separately from data rows	A table without keys	A type of constraint only	A delete command	An index stored separately from data rows	Non-clustered indexes point to the data instead of storing it physically.
158	3	hard	What is referential integrity?	Foreign key values must match primary key values	Rows must be sorted	Columns must be unique	Tables must have indexes	Foreign key values must match primary key values	Referential integrity keeps relationships valid.
159	3	hard	What is a subquery?	A query inside another query	A table column	A join condition	A trigger event	A query inside another query	Subqueries are nested SQL queries.
160	3	hard	Which clause is used to filter grouped data?	WHERE	HAVING	ORDER BY	LIMIT	HAVING	HAVING filters after grouping and aggregation.
161	3	hard	What is the difference between WHERE and HAVING?	WHERE filters rows before grouping, HAVING filters after grouping	HAVING filters rows before grouping, WHERE after grouping	They are identical	Neither filters data	WHERE filters rows before grouping, HAVING filters after grouping	WHERE applies to rows, HAVING applies to grouped results.
162	3	hard	What is a view?	A virtual table based on a query	A physical copy of a table	A foreign key list	A database backup	A virtual table based on a query	Views present data from a stored query.
163	3	hard	What is a stored procedure?	A saved set of SQL statements	A table index	A column constraint	A join type	A saved set of SQL statements	Stored procedures are reusable SQL code blocks.
164	3	hard	What is the use of a trigger?	Automatic execution on events like insert or update	Sorting rows alphabetically	Creating tables only	Deleting the database	Automatic execution on events like insert or update	Triggers execute automatically when specified events occur.
165	3	hard	Which command modifies table structure?	ALTER TABLE	UPDATE TABLE	CHANGE TABLE	MODIFY DATA	ALTER TABLE	ALTER TABLE changes table structure such as columns or constraints.
166	3	hard	What is denormalization?	Adding redundancy for faster reads	Removing all tables	Creating foreign keys	Encrypting data	Adding redundancy for faster reads	Denormalization intentionally adds redundancy for performance.
167	3	hard	What is the purpose of a transaction log?	To record database changes for recovery	To sort records	To define schema	To create indexes	To record database changes for recovery	Transaction logs help recover data after failure.
168	4	easy	What is an operating system?	Software that manages computer hardware and software	A programming language	A database	A web browser	Software that manages computer hardware and software	An operating system controls and manages computer resources.
169	4	easy	Which is an example of an operating system?	Python	Windows	Chrome	MySQL	Windows	Windows is a popular operating system.
170	4	easy	What is the main function of an OS?	Run games only	Manage system resources	Create documents	Browse websites	Manage system resources	An OS manages CPU, memory, files, and devices.
171	4	easy	What is a process?	A program in execution	A file folder	A hardware device	A network packet	A program in execution	A process is an active instance of a program.
172	4	easy	What is a thread?	A lightweight process	A storage device	A type of file	A database table	A lightweight process	Threads share the same process resources.
173	4	easy	What is the purpose of the CPU scheduler?	Select which process runs next	Store files	Delete memory	Create windows	Select which process runs next	The scheduler decides which process gets CPU time.
174	4	easy	What is multitasking?	Running multiple tasks at once	Deleting files	Installing hardware	Changing passwords	Running multiple tasks at once	Multitasking lets the OS handle several tasks.
175	4	easy	What is memory management?	Managing RAM usage	Managing internet connection	Managing keyboard input	Managing sound only	Managing RAM usage	The OS allocates and tracks memory usage.
176	4	easy	What is a file system used for?	Organizing files on storage devices	Compiling code	Drawing graphics	Scanning viruses	Organizing files on storage devices	File systems help store and retrieve files.
177	4	easy	What is a directory?	A folder that contains files	A CPU register	A network address	A program code	A folder that contains files	Directories organize files into folders.
178	4	easy	What is a kernel?	Core part of the OS	A browser extension	A text editor	A virus scanner	Core part of the OS	The kernel manages system operations.
179	4	easy	What is booting?	Starting a computer	Deleting data	Compressing files	Shutting down a program	Starting a computer	Booting is the process of starting the system.
180	4	easy	What is virtual memory?	Memory illusion using disk space	Extra keyboard memory	Permanent cache	A type of CPU	Memory illusion using disk space	Virtual memory extends RAM using secondary storage.
181	4	easy	What is a device driver?	Software that controls hardware	A type of file system	A process scheduler	A database engine	Software that controls hardware	Drivers allow the OS to communicate with devices.
182	4	easy	What is a command-line interface?	Text-based interface	Graphical window	Touch sensor	A hardware chip	Text-based interface	CLI uses text commands.
183	4	easy	What is a GUI?	Graphical User Interface	General Unix Installation	Global Utility Index	Graph User Input	Graphical User Interface	GUI uses windows, icons, and menus.
184	4	easy	What is swapping?	Moving a process between RAM and disk	Installing software	Changing password	Printing files	Moving a process between RAM and disk	Swapping helps manage memory.
185	4	medium	What is context switching?	Switching CPU from one process to another	Changing files	Formatting disk	Updating drivers	Switching CPU from one process to another	Context switching saves and restores process state.
186	4	medium	What is a deadlock?	Processes waiting forever for each other	A type of memory	A file system	A CPU mode	Processes waiting forever for each other	Deadlock occurs when processes are blocked cyclically.
187	4	medium	What are the four necessary conditions for deadlock?	Mutual exclusion, hold and wait, no preemption, circular wait	Speed, memory, cache, disk	Paging, swapping, scheduling, buffering	Input, output, memory, file	Mutual exclusion, hold and wait, no preemption, circular wait	These conditions must all hold for deadlock to occur.
188	4	medium	What is paging?	Dividing memory into fixed-size blocks	Sorting files alphabetically	Compressing disk data	Changing CPU speed	Dividing memory into fixed-size blocks	Paging divides memory into pages and frames.
189	4	medium	What is a page fault?	Requested page not in RAM	CPU overheating	Disk failure	Wrong password	Requested page not in RAM	A page fault happens when memory page is not present in RAM.
190	4	medium	What is thrashing?	Excessive paging causing low performance	Fast file access	CPU scheduling method	Security attack	Excessive paging causing low performance	Thrashing reduces system efficiency due to too much paging.
191	4	medium	What is a semaphore?	Synchronization tool for processes	A file format	A memory chip	A CPU register	Synchronization tool for processes	Semaphores control access to shared resources.
192	4	medium	What is a mutex?	Mutual exclusion lock	A memory leak	A scheduling algorithm	A disk partition	Mutual exclusion lock	Mutex protects critical sections.
193	4	medium	What is a critical section?	Part of code accessing shared resources	A file name	A memory page	A CPU core	Part of code accessing shared resources	Critical sections require synchronization.
194	4	medium	What is FCFS scheduling?	First Come First Serve	Fast CPU File System	Fixed Cache Flow Scheme	First Compute First Sort	First Come First Serve	Processes are served in arrival order.
195	4	medium	What is SJF scheduling?	Shortest Job First	Slow Job Format	System Job Function	Simple Join File	Shortest Job First	The shortest process is selected first.
196	4	medium	What is round robin scheduling?	Each process gets equal CPU time in turns	Only one process runs forever	Shortest task always runs first	Jobs are sorted by priority only	Each process gets equal CPU time in turns	Round robin uses time slices or quanta.
197	4	medium	What is a time quantum?	Maximum CPU time for a process in round robin	Disk size	Page size	Memory speed	Maximum CPU time for a process in round robin	A time quantum limits CPU usage per turn.
198	4	medium	What is fragmentation?	Wasted memory space	CPU scheduling	File encryption	Network delay	Wasted memory space	Fragmentation occurs when memory is not used efficiently.
199	4	medium	What is internal fragmentation?	Unused space inside allocated memory block	Unused space between blocks	Memory encryption	Disk compression	Unused space inside allocated memory block	Internal fragmentation wastes space within a block.
200	4	medium	What is external fragmentation?	Free memory scattered in small pieces	CPU overheating	Large file storage	Password mismatch	Free memory scattered in small pieces	External fragmentation leaves free space in separated gaps.
201	4	medium	What is a system call?	Interface for user program to request OS service	A hardware interrupt only	A file system type	A memory page	Interface for user program to request OS service	System calls allow programs to interact with the kernel.
202	4	medium	What is a zombie process?	A finished process that still has an entry in the process table	A running kernel thread	A swapped-out page	A blocked device driver	A finished process that still has an entry in the process table	Zombie processes have terminated but are not fully removed.
203	4	hard	What is the difference between a process and a thread?	A process has its own memory, threads share process memory	Threads have separate memory, processes share memory	They are the same	Threads run only in kernel mode	A process has its own memory, threads share process memory	Threads are lighter and share resources within a process.
204	4	hard	What is the purpose of virtual memory management?	Allow programs to use more memory than physical RAM	Increase CPU speed	Create files	Prevent booting	Allow programs to use more memory than physical RAM	Virtual memory extends usable memory beyond physical RAM.
205	4	hard	What is demand paging?	Loading pages only when needed	Loading all pages at once	Deleting unused pages	Copying files	Loading pages only when needed	Demand paging loads pages into RAM only on access.
206	4	hard	What is the working set of a process?	Set of pages currently in active use	Set of all files on disk	Set of CPU registers	Set of user permissions	Set of pages currently in active use	Working set helps estimate memory needs.
207	4	hard	What is starvation in CPU scheduling?	A process waits indefinitely due to low priority	A process finishes too quickly	A memory page fault	A type of lock	A process waits indefinitely due to low priority	Starvation happens when a process is repeatedly skipped.
208	4	hard	What is priority scheduling?	Processes are selected based on priority	Processes are selected by arrival only	All processes share CPU equally	Only shortest tasks run	Processes are selected based on priority	Higher priority processes are served first.
209	4	hard	What is preemptive scheduling?	OS can interrupt a running process	Only one process can run	Processes never stop	Memory is never shared	OS can interrupt a running process	Preemptive scheduling allows the OS to take CPU away.
210	4	hard	What is non-preemptive scheduling?	Process keeps CPU until it finishes or blocks	OS interrupts randomly	Only I/O tasks run	Processes are killed instantly	Process keeps CPU until it finishes or blocks	Non-preemptive processes retain CPU until completion or wait.
211	4	hard	What is the convoy effect?	Short processes wait behind long ones in FCFS	Multiple CPUs work together	Disk speed increases	Memory becomes virtual	Short processes wait behind long ones in FCFS	FCFS can delay many short jobs behind a long job.
212	4	hard	What is LRU page replacement?	Least Recently Used replacement policy	Largest Random Utility	Last Running Unit	Longest Remaining Usage	Least Recently Used replacement policy	LRU replaces the page not used for the longest time.
213	4	hard	What is optimal page replacement?	Replace page that will not be used for the longest future time	Replace the newest page	Replace the smallest page	Replace the oldest process	Replace page that will not be used for the longest future time	Optimal replacement minimizes future page faults.
214	4	hard	What is a race condition?	Outcome depends on timing of concurrent execution	A CPU benchmark	A file system error	A deadlock solution	Outcome depends on timing of concurrent execution	Race conditions occur when shared data is accessed without proper sync.
215	4	hard	What is a fork system call used for?	Create a new process	Delete a file	Allocate memory	Schedule CPU	Create a new process	fork creates a child process.
216	4	hard	What does exec do after fork?	Replaces process image with a new program	Deletes the process	Creates a file	Locks memory	Replaces process image with a new program	exec loads and runs a new program in the process.
217	4	hard	What is a shell?	Command interpreter between user and OS	A memory device	A CPU cache	A file format	Command interpreter between user and OS	The shell interprets user commands.
218	4	hard	What is inter-process communication?	Methods for processes to exchange data	A disk format	A CPU instruction	A file permission	Methods for processes to exchange data	IPC enables cooperation between processes.
219	4	hard	What is shared memory in IPC?	Processes access a common memory area	Separate memory for each process	A type of disk file	A scheduling queue	Processes access a common memory area	Shared memory is a fast IPC mechanism.
220	4	hard	What is a message queue?	IPC method where processes send messages	A CPU buffer only	A disk partition	A memory leak	IPC method where processes send messages	Message queues pass data as messages.
221	4	hard	What is the purpose of a file descriptor?	Reference to an open file	A memory address	A CPU register	A network packet	Reference to an open file	File descriptors identify open files for a process.
222	4	hard	What is a shell script mainly used for?	Automating commands	Creating hardware drivers	Replacing RAM	Running only games	Automating commands	Shell scripts automate repetitive tasks.
223	4	hard	What is the goal of deadlock avoidance?	Ensure system never enters unsafe state	Increase file size	Disable multitasking	Remove all processes	Ensure system never enters unsafe state	Deadlock avoidance keeps the system in safe states.
224	4	hard	What is the Bankerâ€™s algorithm used for?	Deadlock avoidance	CPU caching	File compression	Network routing	Deadlock avoidance	Bankerâ€™s algorithm avoids unsafe resource allocation.
225	4	hard	What is a paging frame?	Fixed-size block in physical memory	A file folder	A CPU core	A network frame	Fixed-size block in physical memory	A frame holds one page of logical memory.
226	4	hard	What is a page table used for?	Translate virtual addresses to physical addresses	Sort processes	Store files	Run shell commands	Translate virtual addresses to physical addresses	Page tables map virtual pages to physical frames.
227	5	easy	What is a computer network?	A group of connected devices	A programming language	A database table	A CPU part	A group of connected devices	A network connects devices for communication.
228	5	easy	What does LAN stand for?	Local Area Network	Large Access Node	Long Array Network	Logical Area Node	Local Area Network	LAN is a network within a small geographic area.
229	5	easy	What does WAN stand for?	Wide Area Network	Wireless Access Node	World Array Network	Web Access Network	Wide Area Network	WAN covers a large geographic area.
230	5	easy	What is the main purpose of a network?	Share resources and data	Increase screen brightness	Reduce file size	Store passwords	Share resources and data	Networks allow communication and resource sharing.
231	5	easy	What is a router?	Device that forwards data between networks	Device that prints documents	Device that stores files	Device that runs software	Device that forwards data between networks	Routers connect different networks.
232	5	easy	What is a switch used for?	Connecting devices in a LAN	Storing files	Running applications	Compressing data	Connecting devices in a LAN	Switches connect devices within the same network.
233	5	easy	What is an IP address?	Unique address of a device on a network	A file name	A type of cable	A browser	Unique address of a device on a network	IP addresses identify devices on a network.
234	5	easy	What is a MAC address?	Hardware address of a network device	Memory access code	Main application code	Machine access controller	Hardware address of a network device	MAC addresses are assigned to network interfaces.
235	5	easy	What is the full form of HTTP?	HyperText Transfer Protocol	High Transfer Text Process	Host Transmission Tool Protocol	Hyper Terminal Transfer Program	HyperText Transfer Protocol	HTTP is used for web communication.
236	5	easy	What is the full form of HTTPS?	HyperText Transfer Protocol Secure	High Text Transfer System	Host Transfer Protocol Service	Hyper Transfer Text Secure	HyperText Transfer Protocol Secure	HTTPS encrypts web communication.
237	5	easy	What does DNS do?	Converts domain names to IP addresses	Stores files	Deletes cache	Creates websites	Converts domain names to IP addresses	DNS translates names like google.com into IPs.
238	5	easy	What is a protocol?	Set of rules for communication	A hardware device	A database command	A file type	Set of rules for communication	Protocols define how data is exchanged.
239	5	easy	Which layer of TCP/IP handles routing?	Internet layer	Application layer	Transport layer	Physical layer	Internet layer	The internet layer handles packet routing.
240	5	easy	Which device connects multiple networks?	Router	Hub	Repeater	Keyboard	Router	Routers connect separate networks together.
241	5	easy	What is bandwidth?	Maximum data transfer capacity	A type of software	A port number	A network password	Maximum data transfer capacity	Bandwidth measures network capacity.
242	5	easy	What is latency?	Delay in data transmission	File size	Signal strength	Network address	Delay in data transmission	Latency is the time taken for data to travel.
243	5	easy	What is a network topology?	Arrangement of devices in a network	A data packet	A router setting	A password type	Arrangement of devices in a network	Topology describes how devices are connected.
244	5	easy	Which topology uses a central device?	Star topology	Bus topology	Ring topology	Mesh topology	Star topology	Star topology connects all devices to a central hub or switch.
245	5	medium	What is TCP?	Transmission Control Protocol	Transfer Communication Port	Total Control Process	Terminal Connection Program	Transmission Control Protocol	TCP provides reliable communication.
246	5	medium	What is UDP?	User Datagram Protocol	Universal Data Program	Unit Delivery Process	User Device Port	User Datagram Protocol	UDP provides fast but unreliable communication.
247	5	medium	What is the main difference between TCP and UDP?	TCP is reliable, UDP is faster and connectionless	UDP is reliable, TCP is not	Both are identical	TCP works only on LAN	TCP is reliable, UDP is faster and connectionless	TCP ensures delivery, UDP reduces overhead.
248	5	medium	What is packet switching?	Data is sent in small packets	Data is sent as one big file	Data is stored locally	Data is encrypted only	Data is sent in small packets	Packet switching divides data into packets for transmission.
249	5	medium	What is circuit switching?	A dedicated communication path is established	Packets are split and rerouted	Data is compressed	Only wireless data is used	A dedicated communication path is established	Circuit switching reserves a full path before transmission.
250	5	medium	What is a subnet mask?	Used to divide network and host parts of an IP address	A password manager	A router brand	A type of cable	Used to divide network and host parts of an IP address	Subnet masks identify network and host portions.
251	5	medium	What is subnetting?	Dividing a network into smaller networks	Combining two routers	Changing file names	Deleting packets	Dividing a network into smaller networks	Subnetting improves network organization and efficiency.
252	5	medium	What is a default gateway?	Device that connects a local network to other networks	A web server	A DNS record	A firewall rule	Device that connects a local network to other networks	The default gateway sends traffic outside the local network.
253	5	medium	What is ARP used for?	Finding MAC address from IP address	Finding IP from DNS	Routing packets	Compressing data	Finding MAC address from IP address	ARP maps IP addresses to MAC addresses in local networks.
254	5	medium	What is NAT?	Network Address Translation	New Access Transfer	Node Address Table	Network Allocation Tool	Network Address Translation	NAT translates private IPs to public IPs.
255	5	medium	What is a hub?	Basic device that broadcasts data to all ports	Advanced router	Encryption tool	Storage server	Basic device that broadcasts data to all ports	A hub sends incoming data to every connected device.
256	5	medium	What is a repeater?	Device that regenerates signal	Device that stores packets	Device that assigns IPs	Device that filters traffic	Device that regenerates signal	Repeaters extend signal distance.
257	5	medium	What is a firewall?	Security system that controls network traffic	A router cable	A database index	A DNS server	Security system that controls network traffic	Firewalls filter incoming and outgoing traffic.
258	5	medium	What is a port number?	Logical endpoint for network communication	Physical cable length	Signal delay	Router speed	Logical endpoint for network communication	Ports identify services on a device.
259	5	medium	What does ping test?	Network reachability and delay	File size	CPU speed	Memory usage	Network reachability and delay	Ping checks connectivity and response time.
260	5	medium	What is the OSI model?	Seven-layer network reference model	File system model	Database model	Programming model	Seven-layer network reference model	OSI describes network communication in layers.
261	5	medium	Which OSI layer handles routing?	Network layer	Application layer	Presentation layer	Session layer	Network layer	The network layer routes packets between networks.
262	5	medium	Which OSI layer handles end-to-end delivery?	Transport layer	Physical layer	Data link layer	Session layer	Transport layer	The transport layer manages end-to-end communication.
263	5	hard	What is the difference between a hub and a switch?	A switch sends data only to the destination port, hub broadcasts to all	A hub encrypts traffic, switch does not	They are the same	A hub assigns IPs	A switch sends data only to the destination port, hub broadcasts to all	Switches are smarter and reduce collisions.
264	5	hard	What is collision in networking?	Two signals interfere on the same medium	A DNS lookup	A firewall rule	A routing table	Two signals interfere on the same medium	Collisions occur when two devices transmit simultaneously on shared media.
265	5	hard	What is CSMA/CD used for?	Collision detection in Ethernet	IP routing	DNS translation	File transfer	Collision detection in Ethernet	CSMA/CD helps detect and handle collisions in wired networks.
266	5	hard	What is CSMA/CA used for?	Collision avoidance in wireless networks	Packet encryption	Routing tables	File compression	Collision avoidance in wireless networks	CSMA/CA is commonly used in Wi-Fi.
267	5	hard	What is the purpose of the transport layer?	Provide reliable or unreliable delivery between hosts	Convert binary to text	Assign MAC addresses	Route packets at physical level	Provide reliable or unreliable delivery between hosts	Transport layer provides process-to-process communication.
268	5	hard	What is flow control in TCP?	Regulates data transmission rate between sender and receiver	Changes IP address	Blocks DNS	Encrypts packets	Regulates data transmission rate between sender and receiver	Flow control prevents receiver overload.
269	5	hard	What is congestion control?	Controls network traffic to prevent overload	Manages passwords	Assigns ports	Creates subnets	Controls network traffic to prevent overload	Congestion control reduces excessive traffic in the network.
270	5	hard	What is a three-way handshake?	TCP connection establishment process	DNS lookup process	Routing process	Encryption process	TCP connection establishment process	SYN, SYN-ACK, ACK establish a TCP connection.
271	5	hard	What are the steps in TCP three-way handshake?	SYN, SYN-ACK, ACK	ACK, FIN, SYN	RST, PSH, URG	GET, POST, PUT	SYN, SYN-ACK, ACK	These three packets establish a TCP session.
272	5	hard	What is TCP sliding window?	Method for controlling how much data can be sent before acknowledgment	A routing protocol	A firewall rule	A DNS cache	Method for controlling how much data can be sent before acknowledgment	Sliding window improves TCP efficiency and flow control.
273	5	hard	What is a DNS A record?	Maps domain name to IPv4 address	Maps IP to domain	Stores email records	Defines routing path	Maps domain name to IPv4 address	A record links a domain to an IPv4 address.
274	5	hard	What is a CNAME record?	Alias for another domain name	IP address record	Mail server record	Security record	Alias for another domain name	CNAME creates a domain alias.
275	5	hard	What is the purpose of ICMP?	Send control messages and error reporting	Encrypt traffic	Assign IPs	Store files	Send control messages and error reporting	ICMP is used for diagnostics like ping.
276	5	hard	What is traceroute used for?	Finding packet path to destination	Encrypting data	Changing DNS	Compressing files	Finding packet path to destination	Traceroute shows the route packets take.
277	5	hard	What is a broadcast address?	Address used to send to all hosts in a subnet	Address for one device only	Router password	A loopback address	Address used to send to all hosts in a subnet	Broadcast reaches every host in the subnet.
278	5	hard	What is the loopback address commonly used for?	Testing the local network stack	Connecting to internet	Assigning public IP	Routing packets	Testing the local network stack	Loopback is used for local host testing.
279	5	hard	What is a private IP address?	IP used inside local networks	IP visible globally only	Router MAC address	DNS name	IP used inside local networks	Private IPs are not directly routable on the internet.
280	5	hard	What is a public IP address?	IP address reachable over the internet	Hidden local address	Temporary port number	Internal hostname	IP address reachable over the internet	Public IPs are assigned by ISPs and used on the internet.
281	5	hard	What is the purpose of routing tables?	Store paths to destinations	Encrypt packets	Compress files	Manage browser cache	Store paths to destinations	Routing tables guide packet forwarding.
282	5	hard	What is a broadcast storm?	Excessive broadcasts overwhelm the network	A firewall attack only	A TCP error	A DNS timeout	Excessive broadcasts overwhelm the network	Broadcast storms can severely reduce network performance.
283	5	hard	What is VPN used for?	Secure private communication over public networks	Increase CPU speed	Store files locally	Change screen brightness	Secure private communication over public networks	VPNs create encrypted tunnels over the internet.
284	5	hard	What is encryption in networking?	Converting data into unreadable form for security	Deleting packets	Routing traffic	Changing IPs	Converting data into unreadable form for security	Encryption protects data from unauthorized access.
285	5	hard	What is the main role of DNS caching?	Improve name resolution speed	Increase packet loss	Block all traffic	Assign MAC addresses	Improve name resolution speed	Caching reduces repeated DNS lookups.
286	5	hard	What is the maximum size of an IPv4 address space?	About 4.3 billion addresses	About 1 million addresses	About 1 trillion addresses	Unlimited addresses	About 4.3 billion addresses	IPv4 uses 32-bit addressing.
287	5	hard	What is IPv6?	128-bit internet protocol version	A type of router	A firewall setting	A wireless cable	128-bit internet protocol version	IPv6 provides a much larger address space.
288	5	hard	What is the key benefit of IPv6 over IPv4?	Larger address space	Smaller packets only	No routing needed	No security	Larger address space	IPv6 solves address exhaustion.
289	5	hard	What is packet loss?	Packets fail to reach destination	Data compression	DNS translation	Signal boosting	Packets fail to reach destination	Packet loss affects network quality and reliability.
290	6	easy	What does OOP stand for?	Object-Oriented Programming	Open Operating Platform	Output Oriented Process	Object Option Programming	Object-Oriented Programming	OOP is a programming paradigm based on objects.
291	6	easy	What is an object?	An instance of a class	A type of loop	A database table	A compiler error	An instance of a class	An object is created from a class.
292	6	easy	What is a class?	A blueprint for objects	A running program	A variable type only	A network structure	A blueprint for objects	A class defines properties and methods.
293	6	easy	Which concept means wrapping data and methods together?	Encapsulation	Inheritance	Polymorphism	Abstraction	Encapsulation	Encapsulation bundles data and methods in one unit.
294	6	easy	Which concept allows one class to acquire properties of another?	Inheritance	Polymorphism	Encapsulation	Abstraction	Inheritance	Inheritance promotes code reuse.
295	6	easy	Which concept means hiding internal details?	Abstraction	Inheritance	Encapsulation	Overloading	Abstraction	Abstraction shows only essential features.
296	6	easy	Which concept allows one interface to represent many forms?	Polymorphism	Encapsulation	Abstraction	Inheritance	Polymorphism	Polymorphism enables multiple behaviors under one interface.
297	6	easy	What is a method?	A function inside a class	A type of object	A loop statement	A file format	A function inside a class	Methods define behaviors of objects.
298	6	easy	What is a constructor?	A special method used to initialize objects	A loop keyword	A database table	A type of inheritance	A special method used to initialize objects	Constructors initialize new objects.
299	6	easy	What is encapsulation used for?	Protecting data	Sorting arrays	Deleting classes	Creating loops	Protecting data	Encapsulation restricts direct access to data.
300	6	easy	What is inheritance used for?	Code reuse	File storage	Error handling	Data encryption	Code reuse	Inheritance lets a child class reuse parent class features.
301	6	easy	What is an instance variable?	A variable belonging to an object	A global constant	A function call	A package name	A variable belonging to an object	Instance variables store object-specific data.
302	6	easy	What is a static variable?	A variable shared by all objects of a class	A variable inside a loop	A temporary file	A function parameter	A variable shared by all objects of a class	Static variables are common to the class.
303	6	easy	What is a superclass?	Parent class	Child class	Interface only	Method only	Parent class	Superclass is the class being inherited from.
304	6	easy	What is a subclass?	Child class	Parent class	Interface only	Package only	Child class	Subclass inherits from a superclass.
305	6	easy	What is method overloading?	Same method name with different parameters	Replacing a class	Deleting an object	Changing a variable type	Same method name with different parameters	Overloading means multiple methods with same name but different signatures.
306	6	easy	What is method overriding?	Redefining a parent class method in child class	Using same variable twice	Creating a new package	Declaring a class twice	Redefining a parent class method in child class	Overriding changes inherited behavior.
307	6	easy	What is a public access modifier?	Accessible from anywhere	Accessible only in class	Accessible only in package	Not accessible	Accessible from anywhere	Public members can be accessed globally.
308	6	medium	What is the purpose of abstraction?	Hide implementation details and show essential features	Make code longer	Store files	Reduce memory	Hide implementation details and show essential features	Abstraction simplifies complex systems.
309	6	medium	What is polymorphism in OOP?	One interface, many implementations	One file, many folders	One variable, many values	One function only	One interface, many implementations	Polymorphism allows different behaviors through the same interface.
310	6	medium	What is compile-time polymorphism?	Method overloading	Method overriding	Inheritance	Encapsulation	Method overloading	Overloading is resolved at compile time.
311	6	medium	What is runtime polymorphism?	Method overriding	Method overloading	Class creation	Object deletion	Method overriding	Overriding is resolved at runtime.
312	6	medium	What is an interface?	A contract that classes implement	A type of object	A constructor	A private method	A contract that classes implement	Interfaces define methods that implementing classes must provide.
313	6	medium	What is an abstract class?	A class that cannot be instantiated directly	A class with no methods	A class with only static variables	A class without inheritance	A class that cannot be instantiated directly	Abstract classes are meant to be extended.
314	6	medium	Can an abstract class contain a concrete method?	Yes	No	Only in JavaScript	Only in Python	Yes	Abstract classes can include both abstract and concrete methods.
315	6	medium	What is the difference between class and object?	Class is blueprint, object is instance	Object is blueprint, class is instance	Both are same	Neither stores data	Class is blueprint, object is instance	A class defines structure; an object is created from it.
316	6	medium	What is constructor overloading?	Multiple constructors with different parameters	One constructor only	Deleting constructors	Static constructors only	Multiple constructors with different parameters	Constructor overloading provides different ways to initialize objects.
317	6	medium	What is a destructor?	A method used to clean up an object	A type of class	A variable modifier	A loop structure	A method used to clean up an object	Destructors release resources when an object is destroyed.
318	6	medium	What is the this keyword used for?	Reference current object	Create new class	Delete object	Call parent class only	Reference current object	this refers to the current object.
319	6	medium	What is the super keyword used for?	Reference parent class	Create subclass	Access global variable	Define interface	Reference parent class	super is used to call parent class members.
320	6	medium	What is multiple inheritance?	A class inherits from more than one class	A class has many objects	A method has many names	A file has many names	A class inherits from more than one class	Multiple inheritance combines multiple parent classes.
321	6	medium	What is hybrid inheritance?	Combination of more than one inheritance type	Only single inheritance	No inheritance	Only multilevel inheritance	Combination of more than one inheritance type	Hybrid inheritance mixes different inheritance patterns.
322	6	medium	What is single inheritance?	One child class inherits from one parent class	One class has multiple objects	Many classes share one method	One object has many names	One child class inherits from one parent class	Single inheritance is the simplest inheritance form.
323	6	medium	What is multilevel inheritance?	A class inherits from a class that already inherits another class	A class with many variables	A method with many parameters	A loop inside a loop	A class inherits from a class that already inherits another class	Multilevel inheritance forms a chain of inheritance.
324	6	hard	Why is encapsulation important?	It improves security and maintainability	It makes code slower always	It removes classes	It prevents object creation	It improves security and maintainability	Encapsulation hides data and reduces unintended access.
325	6	hard	What is dynamic binding?	Method call resolved at runtime	Method call resolved at compile time	Class loaded from disk	Variable declared globally	Method call resolved at runtime	Dynamic binding supports runtime polymorphism.
326	6	hard	What is early binding?	Method call resolved at compile time	Method call resolved at runtime	Object destroyed early	Class copied twice	Method call resolved at compile time	Early binding is compile-time binding.
327	6	hard	What is an association in OOP?	A relationship between two classes	A loop statement	A file reference	A constructor type	A relationship between two classes	Association describes a connection between objects.
328	6	hard	What is aggregation?	Weak relationship where child can exist independently	Strong ownership where child cannot exist independently	A type of loop	A method override	Weak relationship where child can exist independently	Aggregation represents a has-a relationship with independent lifetimes.
329	6	hard	What is composition?	Strong ownership where child depends on parent	Weak relationship only	A kind of interface	A method overloading rule	Strong ownership where child depends on parent	Composition is a stronger form of aggregation.
330	6	hard	What is the difference between aggregation and composition?	Aggregation is weak, composition is strong	Aggregation is strong, composition is weak	They are identical	Both are inheritance types	Aggregation is weak, composition is strong	Composition implies tighter ownership and lifecycle dependency.
331	6	hard	What is coupling in OOP?	Degree of dependency between classes	Number of objects	Size of a class file	Number of methods only	Degree of dependency between classes	Low coupling is preferred for flexible design.
332	6	hard	What is cohesion?	How closely related the responsibilities of a class are	How many classes exist	How fast the program runs	How many files are created	How closely related the responsibilities of a class are	High cohesion means a class has a focused purpose.
333	6	hard	What is the ideal relationship between coupling and cohesion?	Low coupling and high cohesion	High coupling and low cohesion	High coupling and high cohesion	Low coupling and low cohesion	Low coupling and high cohesion	This makes code easier to maintain and extend.
334	6	hard	What is an object reference?	A variable that points to an object	A class definition	A method body	A package name	A variable that points to an object	References store the address or handle of an object.
335	6	hard	What is encapsulation achieved through?	Access modifiers and getters/setters	Only loops	Only arrays	Only classes	Access modifiers and getters/setters	Encapsulation controls access using language features.
336	6	hard	What is a protected member?	Accessible in class and subclasses	Accessible only globally	Not accessible anywhere	Accessible only in the same object	Accessible in class and subclasses	Protected members are available to derived classes.
337	6	hard	What is the purpose of a virtual method?	Allow overriding in derived classes	Create variables	Store data in files	Delete objects	Allow overriding in derived classes	Virtual methods support runtime polymorphism.
338	6	hard	What is interface implementation?	A class providing method bodies defined by an interface	A class deleting another class	A method calling itself	A file importing another file	A class providing method bodies defined by an interface	Implementation fulfills the interface contract.
339	6	hard	What is an anonymous object?	An object without a reference name	A class without methods	A variable without type	A method without return	An object without a reference name	Anonymous objects are used temporarily without storing in a variable.
340	6	hard	What is object slicing?	Loss of derived class parts when assigned to base object	Saving object to disk	Copying class files	Deleting extra methods	Loss of derived class parts when assigned to base object	Object slicing occurs in some inheritance scenarios.
341	6	hard	What is the main advantage of OOP?	Modularity and code reuse	Fewer variables only	No classes needed	No compilation needed	Modularity and code reuse	OOP organizes code into reusable units.
342	6	hard	What is message passing in OOP?	Objects communicate by calling methods	Objects share the same file	Objects compile code	Objects delete memory	Objects communicate by calling methods	Message passing means one object requests behavior from another.
343	6	hard	What is late binding useful for?	Flexibility in choosing method implementation at runtime	Reducing number of classes	Avoiding objects	Preventing inheritance	Flexibility in choosing method implementation at runtime	Late binding supports dynamic behavior.
379	7	medium	What is useEffect in React?	Hook for side effects	Hook for styling	Hook for routing	Hook for forms only	Hook for side effects	useEffect is used for data fetching and lifecycle behavior.
344	6	hard	What is the purpose of abstraction layers?	Hide complex implementation and expose simple interface	Increase code duplication	Remove classes	Force global variables	Hide complex implementation and expose simple interface	Layers simplify usage by hiding internal details.
345	6	hard	What is a factory method?	A method that creates objects	A method that deletes classes	A variable initializer	A loop pattern	A method that creates objects	Factory methods centralize object creation.
346	6	hard	What is the benefit of the factory pattern?	Decouples object creation from usage	Makes classes larger always	Reduces inheritance	Removes polymorphism	Decouples object creation from usage	Factory pattern improves flexibility and maintainability.
347	6	hard	What is a singleton class?	A class that allows only one instance	A class with many constructors	A class with no methods	A class that cannot be inherited	A class that allows only one instance	Singleton ensures only one object exists for the class.
348	7	easy	What is React?	A JavaScript library for building user interfaces	A database	An operating system	A CSS framework only	A JavaScript library for building user interfaces	React is used to build interactive UIs.
349	7	easy	What is Node.js?	JavaScript runtime built on Chrome V8	A database engine	A CSS preprocessor	A browser plugin	JavaScript runtime built on Chrome V8	Node.js lets you run JavaScript on the server.
350	7	easy	What is Express.js?	A Node.js web framework	A database	A React hook	A browser	A Node.js web framework	Express simplifies server-side development.
351	7	easy	What does API stand for?	Application Programming Interface	Advanced Programming Input	Application Page Interface	Automatic Program Integration	Application Programming Interface	APIs let software communicate with each other.
352	7	easy	What is JSX in React?	JavaScript syntax extension for UI	Java server code	Database query language	CSS rule set	JavaScript syntax extension for UI	JSX lets you write HTML-like syntax in React.
353	7	easy	What is the purpose of state in React?	Store data that can change	Create CSS files	Run SQL queries	Connect to Wi-Fi	Store data that can change	State holds dynamic component data.
354	7	easy	What is a component in React?	Reusable UI building block	A database table	A network cable	A file extension	Reusable UI building block	React apps are built with components.
355	7	easy	What is props in React?	Data passed from parent to child	A styling method	A backend server	A SQL command	Data passed from parent to child	Props are used to pass information between components.
356	7	easy	What is MongoDB?	NoSQL database	SQL framework	React package	Node.js module	NoSQL database	MongoDB stores data in documents.
357	7	easy	What is a database?	Organized collection of data	A browser extension	A CSS file	A JavaScript function	Organized collection of data	Databases store and manage data efficiently.
358	7	easy	What is a collection in MongoDB?	Group of documents	Group of tables	Group of files	Group of servers	Group of documents	Collections are like tables in MongoDB.
359	7	easy	What is a document in MongoDB?	A JSON-like record	A SQL join	A CSS selector	A React state	A JSON-like record	MongoDB stores data as documents.
360	7	easy	What is the purpose of npm?	Manage packages	Run the browser	Create databases	Style HTML	Manage packages	npm installs and manages Node packages.
361	7	easy	What is package.json used for?	Stores project metadata and dependencies	Stores images	Stores CSS only	Stores browser history	Stores project metadata and dependencies	package.json describes the Node project.
362	7	easy	What does CRUD stand for?	Create, Read, Update, Delete	Copy, Run, Undo, Draw	Code, Render, Use, Deploy	Create, Remove, Use, Download	Create, Read, Update, Delete	CRUD describes basic database operations.
363	7	easy	What is the purpose of the frontend?	User interface part of the app	Database storage only	Server monitoring only	File compression only	User interface part of the app	Frontend is what users interact with.
364	7	easy	What is the purpose of the backend?	Server-side logic and data handling	Only styling pages	Only drawing icons	Only storing images	Server-side logic and data handling	Backend handles business logic and databases.
365	7	easy	What is a route in Express?	Path that handles HTTP requests	A CSS rule	A MongoDB collection	A React component	Path that handles HTTP requests	Routes map URLs to server actions.
366	7	medium	What is REST?	Architectural style for web services	A React hook	A database model	A CSS property	Architectural style for web services	REST is used for designing APIs.
367	7	medium	What is GET used for in HTTP?	Retrieve data	Delete data	Create files	Encrypt passwords	Retrieve data	GET requests fetch data from the server.
368	7	medium	What is POST used for in HTTP?	Send data to the server	Retrieve data only	Delete CSS	Render components	Send data to the server	POST is used to submit data.
369	7	medium	What is PUT used for?	Update a resource completely	Fetch all users	Delete the browser	Create CSS rules	Update a resource completely	PUT replaces a resource.
370	7	medium	What is PATCH used for?	Partial update of a resource	Delete a resource	Create a database	Style a webpage	Partial update of a resource	PATCH modifies part of a resource.
371	7	medium	What is DELETE used for?	Remove a resource	Read a resource	Create a file	Refresh the page	Remove a resource	DELETE removes data from the server.
372	7	medium	What is middleware in Express?	Function between request and response	A database table	A React component	A CSS file	Function between request and response	Middleware processes requests before final handling.
373	7	medium	What is CORS?	Cross-Origin Resource Sharing	Common Object Routing System	Client Output Response Server	Cross Object Request Syntax	Cross-Origin Resource Sharing	CORS controls cross-origin requests.
374	7	medium	What is authentication?	Verifying user identity	Changing website color	Creating tables	Compressing files	Verifying user identity	Authentication confirms who the user is.
375	7	medium	What is authorization?	Checking permissions	Logging in user only	Styling components	Installing packages	Checking permissions	Authorization decides what a user can access.
376	7	medium	What is bcrypt used for?	Password hashing	Database indexing	CSS styling	API routing	Password hashing	bcrypt hashes passwords securely.
377	7	medium	What is JWT?	JSON Web Token	Java Web Table	JavaScript Wrapper Tool	JSON Write Type	JSON Web Token	JWT is used for secure authentication tokens.
378	7	medium	What is useState in React?	Hook for state management	Database connector	CSS library	Server middleware	Hook for state management	useState lets components store and update state.
445	8	medium	What is k-means?	A clustering algorithm	A sorting method	A neural activation	A regression tool	A clustering algorithm	K-means groups data into k clusters.
380	7	medium	What is virtual DOM?	Lightweight representation of actual DOM	A database index	A CSS file	A Node server	Lightweight representation of actual DOM	React uses virtual DOM for efficient updates.
381	7	medium	What is reconciliation in React?	Comparing virtual DOM updates	Connecting to MongoDB	Creating routes	Encrypting passwords	Comparing virtual DOM updates	React reconciles changes before updating the UI.
382	7	medium	What is a controlled component?	Form element controlled by React state	A backend route	A database document	A CSS selector	Form element controlled by React state	Controlled components store form values in state.
383	7	medium	What is an uncontrolled component?	Form element managed by DOM	A React state hook	A MongoDB schema	A route middleware	Form element managed by DOM	Uncontrolled components use the DOM directly.
384	7	medium	What is Mongoose?	MongoDB object modeling tool	React router	Node package manager	CSS library	MongoDB object modeling tool	Mongoose helps work with MongoDB in Node.js.
385	7	medium	What is a schema in Mongoose?	Structure of a document	A browser window	A CSS rule	A React state	Structure of a document	Schemas define the shape of MongoDB documents.
386	7	medium	What is an index in database?	Structure that speeds up search	A React hook	A server port	A CSS class	Structure that speeds up search	Indexes improve query performance.
387	7	hard	What is the purpose of React keys in lists?	Help React identify items efficiently	Create styles	Connect backend	Store database records	Help React identify items efficiently	Keys improve rendering performance and identity.
388	7	hard	What is prop drilling?	Passing props through many component levels	A database technique	An API error	A CSS layout method	Passing props through many component levels	Prop drilling can make component trees harder to manage.
389	7	hard	How can prop drilling be reduced in React?	Use Context API or state management tools	Use more CSS	Use only class names	Use MongoDB	Use Context API or state management tools	Context shares state without passing props deeply.
390	7	hard	What is the Context API?	Way to share data globally in React tree	Database schema tool	Node package installer	HTTP method	Way to share data globally in React tree	Context helps avoid prop drilling.
391	7	hard	What is server-side rendering?	Rendering React on the server	Writing CSS in HTML	Running SQL in browser	Storing files in cloud	Rendering React on the server	SSR sends pre-rendered HTML from server.
392	7	hard	What is client-side rendering?	Rendering in browser using JavaScript	Rendering only on server	Using MongoDB only	Using HTML only	Rendering in browser using JavaScript	CSR renders the UI on the client.
393	7	hard	What is an async function in Node.js?	Function that returns a promise and handles async code	Function that blocks CPU	Function that only styles HTML	Function used only in MongoDB	Function that returns a promise and handles async code	Async functions simplify asynchronous code.
394	7	hard	What is the event loop in Node.js?	Mechanism that handles async operations	Database query engine	CSS processor	React renderer	Mechanism that handles async operations	The event loop enables non-blocking behavior.
395	7	hard	What is non-blocking I/O?	Operations that do not stop the main thread	Operations that stop server	Operations that run only in browser	Operations that delete data	Operations that do not stop the main thread	Node.js is known for non-blocking I/O.
396	7	hard	What is Express router?	Module for organizing routes	Database schema	React component	CSS framework	Module for organizing routes	Routers keep Express code modular.
397	7	hard	What is middleware chaining?	Passing request through multiple middleware functions	A database join	A React hook sequence	A CSS animation	Passing request through multiple middleware functions	Middleware can be executed in sequence.
398	7	hard	What is the purpose of dotenv?	Load environment variables from a file	Style React pages	Create database indexes	Compress images	Load environment variables from a file	dotenv helps manage secrets and config.
399	7	hard	What is an environment variable?	Configuration value stored outside code	A React component	A MongoDB document	An HTTP header	Configuration value stored outside code	Environment variables keep sensitive data out of code.
400	7	hard	What is pagination in APIs?	Splitting data into pages	Encrypting requests	Combining routes	Rendering components	Splitting data into pages	Pagination improves performance and usability.
401	7	hard	Why is pagination useful?	Reduces data load and improves response time	Makes CSS easier	Removes authentication	Deletes duplicates automatically	Reduces data load and improves response time	Pagination helps large data sets load efficiently.
402	7	hard	What is aggregation in MongoDB?	Process of processing data using pipelines	A React hook	A Node package	A CSS grid	Process of processing data using pipelines	Aggregation is used for advanced data processing.
403	7	hard	What is indexing in MongoDB used for?	Faster query performance	Frontend rendering	Password hashing	Routing requests	Faster query performance	Indexes make searches faster.
404	7	hard	What is a transaction in a database?	Set of operations executed as one unit	A CSS animation	A React context	A Node module	Set of operations executed as one unit	Transactions ensure consistency across operations.
405	7	hard	What is ACID in databases?	Atomicity, Consistency, Isolation, Durability	API, Cache, Index, DOM	Array, Class, Interface, Data	Async, Create, Insert, Delete	Atomicity, Consistency, Isolation, Durability	ACID describes reliable transaction properties.
406	7	hard	What is the difference between SQL and NoSQL?	SQL is relational, NoSQL is flexible and document-oriented	NoSQL is always slower	SQL stores only JSON	NoSQL cannot scale	SQL is relational, NoSQL is flexible and document-oriented	SQL uses structured tables, NoSQL uses flexible models.
407	7	hard	What is a join in SQL?	Combining rows from related tables	Hashing passwords	Rendering HTML	Creating APIs	Combining rows from related tables	Joins connect data from multiple tables.
408	7	hard	What is a foreign key in SQL?	Field that links to a primary key in another table	A CSS selector	A React prop	A backend route	Field that links to a primary key in another table	Foreign keys enforce relationships between tables.
409	7	hard	What is normalization in databases?	Organizing data to reduce redundancy	Styling forms	Rendering components	Creating routes	Organizing data to reduce redundancy	Normalization improves database structure.
410	7	hard	What is denormalization?	Adding controlled redundancy for performance	Removing all indexes	Encrypting data	Splitting React components	Adding controlled redundancy for performance	Denormalization is sometimes used to optimize reads.
411	7	hard	What is a RESTful API?	API that follows REST principles	A React component	A SQL query type	A CSS framework	API that follows REST principles	RESTful APIs use standard HTTP methods and resources.
412	7	hard	What is HATEOAS?	Hypermedia As The Engine Of Application State	Hyper Text API Transfer	High-Level API Testing	Hosted Application Token Exchange	Hypermedia As The Engine Of Application State	HATEOAS is an advanced REST constraint.
413	7	hard	What is rate limiting in APIs?	Restricting number of requests in a time period	Increasing server RAM	Changing database schema	Styling the frontend	Restricting number of requests in a time period	Rate limiting protects APIs from abuse.
414	7	hard	Why use ORM or ODM tools?	Simplify database interaction with objects	Replace HTTP methods	Draw UI faster	Make CSS responsive	Simplify database interaction with objects	ORM/ODM tools reduce manual query handling.
415	8	easy	What does AI stand for?	Artificial Intelligence	Automatic Internet	Advanced Interface	Applied Input	Artificial Intelligence	AI stands for Artificial Intelligence.
416	8	easy	What does ML stand for?	Machine Logic	Machine Learning	Model Language	Modern Learning	Machine Learning	ML stands for Machine Learning.
417	8	easy	What is the main goal of AI?	Make machines act intelligently	Store large files	Replace internet	Design websites	Make machines act intelligently	AI aims to create systems that perform tasks requiring intelligence.
418	8	easy	What is machine learning?	A subset of AI that learns from data	A type of database	A programming language	A computer brand	A subset of AI that learns from data	ML systems learn patterns from data.
419	8	easy	What is data used for in ML?	Training models	Printing reports only	Formatting code	Removing hardware	Training models	Machine learning models learn patterns from data.
420	8	easy	Which of these is an AI application?	Face recognition	Text editor	Keyboard	Monitor	Face recognition	Face recognition is a common AI application.
421	8	easy	Which of these is a machine learning task?	Spam detection	Monitor brightness	Printer setup	File naming	Spam detection	Spam detection can be done using ML.
422	8	easy	What is a model in ML?	A trained system that makes predictions	A file extension	A database table	A network cable	A trained system that makes predictions	A model learns from data and predicts outcomes.
423	8	easy	What is training data?	Data used to train a model	Data deleted by the model	Unused memory	A type of hardware	Data used to train a model	Training data helps the model learn patterns.
424	8	easy	What is testing data?	Data used to evaluate a trained model	Data used to store passwords	Data used only for graphs	Data that cannot be read	Data used to evaluate a trained model	Testing data checks how well a model performs.
425	8	easy	What is supervised learning?	Learning from labeled data	Learning without data	Learning from random noise	Learning from hardware	Learning from labeled data	Supervised learning uses input-output pairs.
426	8	easy	What is unsupervised learning?	Learning from unlabeled data	Learning from labeled data	Learning from a teacher	Learning without computation	Learning from unlabeled data	Unsupervised learning finds hidden patterns in unlabeled data.
427	8	easy	What is reinforcement learning?	Learning through rewards and penalties	Learning from tables	Learning from images only	Learning from labels only	Learning through rewards and penalties	Reinforcement learning improves by interacting with environment.
428	8	easy	Which is an example of classification?	Predicting spam or not spam	Predicting house price	Predicting temperature	Predicting speed	Predicting spam or not spam	Classification predicts categories.
429	8	easy	Which is an example of regression?	Predicting house price	Predicting yes/no answer	Predicting class label	Predicting color category	Predicting house price	Regression predicts continuous values.
430	8	easy	What is overfitting?	Model learns training data too well and performs poorly on new data	Model ignores data	Model has no parameters	Model cannot train	Model learns training data too well and performs poorly on new data	Overfitting reduces generalization.
431	8	easy	What is underfitting?	Model is too simple to capture patterns	Model is too complex	Model has too much data	Model is perfectly trained	Model is too simple to capture patterns	Underfitting happens when the model cannot learn enough from data.
432	8	easy	Which Python library is commonly used for ML?	scikit-learn	Tkinter	Pygame	Flask	scikit-learn	Scikit-learn is widely used for machine learning.
433	8	medium	What is feature engineering?	Creating or transforming input variables for a model	Deleting the model	Writing HTML	Changing CPU speed	Creating or transforming input variables for a model	Feature engineering improves model performance.
434	8	medium	What is a feature in ML?	An input variable used for prediction	A final answer only	A database key	A network address	An input variable used for prediction	Features are the inputs to the model.
435	8	medium	What is a label in supervised learning?	The target output value	The input column	The file name	The model weight	The target output value	Labels are the known answers used for training.
436	8	medium	What is classification used for?	Predicting categories	Predicting only decimals	Drawing charts	Compressing files	Predicting categories	Classification assigns data to classes.
437	8	medium	What is regression used for?	Predicting continuous values	Predicting only classes	Sorting data	Encoding text	Predicting continuous values	Regression estimates numeric output values.
438	8	medium	What is a confusion matrix?	Table showing classification performance	A type of neural network	A data cleaning tool	A clustering algorithm	Table showing classification performance	It summarizes predictions versus actual classes.
439	8	medium	What are precision and recall used for?	Evaluating classification performance	Training images	Compressing models	Increasing memory	Evaluating classification performance	Precision and recall measure model quality in classification.
440	8	medium	What is accuracy in ML?	Percentage of correct predictions	Number of features	Training time	Learning rate	Percentage of correct predictions	Accuracy measures overall correctness.
441	8	medium	What is a decision tree?	A tree-like model for decisions and predictions	A database index	A networking protocol	A file system	A tree-like model for decisions and predictions	Decision trees split data into branches.
442	8	medium	What is a random forest?	An ensemble of decision trees	A single neuron model	A clustering method	A linear equation	An ensemble of decision trees	Random forest combines many trees for better results.
443	8	medium	What is k-NN?	K-Nearest Neighbors	Kernel Numeric Network	Known Neural Node	Key Network Number	K-Nearest Neighbors	k-NN predicts based on nearby data points.
444	8	medium	What is clustering?	Grouping similar data points together	Labeling data by hand	Encrypting data	Deleting duplicates	Grouping similar data points together	Clustering is an unsupervised learning task.
446	8	medium	What is a learning rate?	Step size used during model training	Size of dataset	Number of features	Output label	Step size used during model training	Learning rate controls update size in training.
447	8	medium	What is gradient descent?	An optimization algorithm to minimize loss	A clustering method	A database query	A sorting algorithm	An optimization algorithm to minimize loss	Gradient descent updates parameters to reduce error.
448	8	medium	What is loss in ML?	Measure of model error	Number of layers	Input dataset size	Training speed	Measure of model error	Loss tells how far predictions are from actual values.
449	8	medium	What is a hyperparameter?	A parameter set before training	A learned weight	A target label	A file type	A parameter set before training	Hyperparameters are chosen before training begins.
450	8	medium	What is cross-validation?	Evaluating model using multiple data splits	Combining two models	Deleting features	Encoding labels	Evaluating model using multiple data splits	Cross-validation checks generalization more reliably.
451	8	medium	What is normalization in ML?	Scaling data to a standard range	Adding labels	Creating trees	Removing classes	Scaling data to a standard range	Normalization helps improve training stability.
452	8	medium	What is dimensionality reduction?	Reducing number of input features	Increasing rows	Increasing labels	Adding noise	Reducing number of input features	It simplifies data while keeping useful information.
453	8	hard	What is bias in ML?	Error from overly simple assumptions	Random noise only	Training data size	Number of classes	Error from overly simple assumptions	High bias often leads to underfitting.
454	8	hard	What is variance in ML?	Model sensitivity to training data changes	Model speed	Input labels	Output format	Model sensitivity to training data changes	High variance often leads to overfitting.
455	8	hard	What is the bias-variance tradeoff?	Balance between underfitting and overfitting	Balance between labels and features	Balance between data and storage	Balance between CPU and GPU	Balance between underfitting and overfitting	Good models manage both bias and variance.
456	8	hard	What is ensemble learning?	Combining multiple models	Using one model only	Sorting data	Removing duplicates	Combining multiple models	Ensembles improve performance by combining predictions.
457	8	hard	What is bagging?	Training models independently and combining results	Training one model only	Using labeled data only	A normalization method	Training models independently and combining results	Bagging reduces variance by averaging models.
458	8	hard	What is boosting?	Training models sequentially to correct previous errors	Training unrelated models	A clustering method	A feature scaling method	Training models sequentially to correct previous errors	Boosting focuses on hard-to-predict samples.
459	8	hard	What is a neural network?	A model inspired by the human brain	A database index	A sorting method	A web server	A model inspired by the human brain	Neural networks consist of layers of connected units.
460	8	hard	What is a perceptron?	A basic unit of a neural network	A data table	A type of clustering	A loss function only	A basic unit of a neural network	A perceptron is a simple neuron-like model.
461	8	hard	What is deep learning?	Machine learning with many layers of neural networks	A type of SQL query	A manual labeling process	A sorting method	Machine learning with many layers of neural networks	Deep learning uses multilayer neural networks.
462	8	hard	What is backpropagation?	Method for updating neural network weights	A clustering technique	A file compression method	A database transaction	Method for updating neural network weights	Backpropagation computes gradients for learning.
463	8	hard	What is an activation function?	Adds non-linearity to neural networks	Stores data	Sorts rows	Compresses images	Adds non-linearity to neural networks	Activation functions help neural networks learn complex patterns.
464	8	hard	What is ReLU?	Rectified Linear Unit	Random Error Learning Unit	Recursive Linear Update	Real Loss Utility	Rectified Linear Unit	ReLU is a common activation function.
465	8	hard	What is sigmoid function used for?	Outputs values between 0 and 1	Sorts classes	Increases memory	Removes bias	Outputs values between 0 and 1	Sigmoid is often used in binary classification.
466	8	hard	What is softmax used for?	Convert outputs into probabilities	Normalize input text	Delete columns	Cluster data	Convert outputs into probabilities	Softmax is useful for multi-class classification.
467	8	hard	What is an epoch?	One complete pass through training data	One test example	One feature	One prediction only	One complete pass through training data	Epoch counts full training iterations.
468	8	hard	What is batch size?	Number of samples processed before updating model	Number of classes	Number of layers	Number of predictions	Number of samples processed before updating model	Batch size controls how training data is grouped.
469	8	hard	What is stochastic gradient descent?	Updates model using one sample at a time	Updates model only once	Uses no gradients	Works only for clustering	Updates model using one sample at a time	SGD is a faster variant of gradient descent.
470	8	hard	What is transfer learning?	Using a pretrained model for a new task	Training from scratch only	Moving files between systems	A clustering algorithm	Using a pretrained model for a new task	Transfer learning saves time and data by reusing models.
471	8	hard	What is regularization?	Technique to reduce overfitting	Technique to increase labels	Technique to sort data	Technique to store files	Technique to reduce overfitting	Regularization adds penalty to complex models.
472	8	hard	What is L1 regularization?	Adds absolute value penalty	Adds squared penalty only	Removes all features	Increases learning rate	Adds absolute value penalty	L1 can drive some weights to zero.
473	8	hard	What is L2 regularization?	Adds squared value penalty	Adds absolute value penalty	Removes labels	Creates clusters	Adds squared value penalty	L2 discourages large weights.
474	8	hard	What is dropout in neural networks?	Randomly disables some neurons during training	Adds new layers	Removes all weights	Sorts outputs	Randomly disables some neurons during training	Dropout helps prevent overfitting.
475	8	hard	What is natural language processing?	AI field dealing with text and language	Database indexing	Image compression	Hardware design	AI field dealing with text and language	NLP focuses on understanding and generating language.
476	8	hard	What is computer vision?	AI field dealing with images and video	Sorting text files	Managing routers	Creating tables	AI field dealing with images and video	Computer vision analyzes visual data.
477	8	hard	What is generative AI?	AI that creates new content	AI that only stores data	AI that sorts tables	AI that manages hardware	AI that creates new content	Generative AI can produce text, images, and more.
\.


--
-- Data for Name: quiz_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_results (id, user_id, topic_id, score, total_questions, correct_answers, wrong_answers, attempts, time_taken, difficulty, created_at, percentage) FROM stdin;
1	5	8	2	8	2	6	1	1	\N	2026-05-21 11:11:25.41935	25
2	6	2	8	8	8	0	1	180	\N	2026-05-21 18:57:19.672151	100
3	4	8	2	8	2	6	1	4	\N	2026-05-21 19:01:28.464771	25
4	4	8	8	8	8	0	1	5	\N	2026-05-26 18:51:11.415392	100
5	4	2	1	8	1	7	1	2	\N	2026-05-26 18:51:33.833673	13
6	4	5	2	8	2	6	1	4	\N	2026-05-27 11:09:46.745771	25
\.


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recommendations (id, user_id, recommended_topic, recommendation_reason, created_at) FROM stdin;
1	4	Algorithms	You scored 13% on 'Algorithms'. We recommend reviewing 'Algorithms' again to strengthen your understanding.	2026-05-27 11:09:23.882084
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topics (id, topic_name, description) FROM stdin;
1	Data Structures	Learn fundamental data structures including arrays, linked lists, stacks, queues, trees, graphs, and hash tables. Master their implementations and use cases.
2	Algorithms	Master sorting algorithms, searching techniques, recursion, dynamic programming, greedy algorithms, and algorithm complexity analysis.
3	Database	Understand relational databases, SQL queries, database design, normalization, indexing, transactions, and query optimization techniques.
4	Operating Systems	Learn about process management, scheduling algorithms, memory management, virtual memory, file systems, and concurrency control.
5	Computer Networks	Study network protocols, TCP/IP model, routing algorithms, network security, HTTP/HTTPS, DNS, and socket programming.
6	Object-Oriented Programming	Master OOP concepts including classes, objects, inheritance, polymorphism, encapsulation, abstraction, and design patterns.
7	Web Development	Learn HTML, CSS, JavaScript, responsive design, REST APIs, frontend frameworks, and modern web development practices.
8	AI and ML	Artificial Intelligence and Machine Learning covers intelligent systems, data-driven learning, supervised learning, unsupervised learning, reinforcement learning, classification, regression, clustering, neural networks, deep learning, model evaluation, and real-world applications such as prediction, recommendation, computer vision, and natural language processing.
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, level, created_at) FROM stdin;
2	Test User 2	testuser2@test.com	$2b$10$Im6rPEG5dih/569L5AQw2uZGzIPvJkOASbPo.5JNEFgd8COYMO2by	Beginner	2026-05-17 19:34:24.43129
3	Test Browser	browser@test.com	$2b$10$DAVijY6BO9peZk1zQiGtlukHyLqWrAT5X0006HuSNuvjq90yw1GfK	Beginner	2026-05-17 19:35:16.440431
1	Test User	testuser@test.com	$2b$10$X0I302f1C0i0HtQ8Bz2DGOcaW7vWZTyylvIF91yh/oyI82H5CEHZK	Beginner	2026-05-17 19:34:18.190812
5	Test User	testuser@example.com	$2b$10$gbW2RLtQhYJRbqbKseRpLeYfwp1yQjJv1MBScbI/O1L/tHFOgWx8S	Beginner	2026-05-21 11:07:19.76923
6	Test User	testuser2@example.com	$2b$10$JTUtNlTkHWNfKevtAn6lQesk3SxXSmd0HJk8FVzcn.FnmsExM1eiq	Beginner	2026-05-21 18:47:28.751091
4	surejasmit	smitsureja@gmail.com	$2b$10$jNSEutiM.UhyEZJ/PduOXuMxpyAr2gqhDfhmqTlzBjijcOzqJ10i6	Beginner	2026-05-19 10:49:37.7267
\.


--
-- Name: progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.progress_id_seq', 1, false);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 477, true);


--
-- Name: quiz_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_results_id_seq', 6, true);


--
-- Name: recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recommendations_id_seq', 1, true);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: progress progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: quiz_results quiz_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_results
    ADD CONSTRAINT quiz_results_pkey PRIMARY KEY (id);


--
-- Name: recommendations recommendations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pkey PRIMARY KEY (id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: topics topics_topic_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_topic_name_key UNIQUE (topic_name);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: progress progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: questions questions_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id);


--
-- Name: quiz_results quiz_results_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_results
    ADD CONSTRAINT quiz_results_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id);


--
-- Name: quiz_results quiz_results_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_results
    ADD CONSTRAINT quiz_results_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: recommendations recommendations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict ZwCKxyNioAhBbpEwzet544kLRclOxnyZGv1xbwpYymaClts0tH6t6jTyqo1IZwJ

